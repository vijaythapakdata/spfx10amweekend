import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListNames } from "../Enum/ListNames";
export default class ChoiceServiceApi{
    private context:WebPartContext;
    constructor(context:WebPartContext){
        this.context=context;
    }

public async getChoiceOptions(siteurl:string,fieldValue:any):Promise<any>{
   try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListNames.SharePointList}')/fields/?$filter=EntityPropertyName eq '${fieldValue}'`,
    {
        method:'GET',
        headers:{
            'accept':'application/json;odata=nometadata'
        }
    }
);
if(!response){
    throw new Error(`error while fecthing the value`);
}
const data=await response.json();
const choice=data.value[0].Choices;
return choice.map((items:any)=>({
    key:items,
    text:items
}));
   }
   catch(err){
console.log(err);
   }

}

public async getLookup():Promise<any>{
    try{
        const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${ListNames.LookupList}')/items?$select=Title,ID`,{
            method:'GET',
            headers:{
 'accept':'application/json;odata=nometadata'
            }
        });
        if(!response){
    throw new Error(`error while fecthing the value`);
}
const data=await response.json();
return data.value.map((city:{Title:string,ID:string})=>({
    key:city.ID,
    text:city.Title
}));
    }
    catch(err){
console.error(err);
    }
}
}