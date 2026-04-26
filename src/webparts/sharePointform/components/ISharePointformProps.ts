import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISharePointformProps {
  description: string;
  context:WebPartContext;
  siteurl:string;
  departmentoptions:any;
  genderoptions:any;
  skillsoptions:any;
  citiesoptions:any;
}
