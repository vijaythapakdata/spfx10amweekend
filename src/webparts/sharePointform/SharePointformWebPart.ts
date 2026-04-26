import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SharePointformWebPartStrings';
import SharePointform from './components/SharePointform';
import { ISharePointformProps } from './components/ISharePointformProps';
import {sp}from "@pnp/sp/presets/all";
import ChoiceServiceApi from '../../ServiceApi/ChoiceServiceApi';
export interface ISharePointformWebPartProps {
  description: string;
}

export default class SharePointformWebPart extends BaseClientSideWebPart<ISharePointformWebPartProps> {
private choice_value:ChoiceServiceApi|undefined;
protected onInit(): Promise<void> {
  this.choice_value=new ChoiceServiceApi(this.context);
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext:this.context as any
      })
    });
  }


  public async render(): Promise<void> {
    const element: React.ReactElement<ISharePointformProps> = React.createElement(
      SharePointform,
      {
        description: this.properties.description,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl,
        departmentoptions:await this.choice_value?.getChoiceOptions(this.context.pageContext.web.absoluteUrl,"Department"),
        genderoptions:await this.choice_value?.getChoiceOptions(this.context.pageContext.web.absoluteUrl,"Gender"),
        skillsoptions:await this.choice_value?.getChoiceOptions(this.context.pageContext.web.absoluteUrl,"Skills"),
        citiesoptions:await this.choice_value?.getLookup()

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
