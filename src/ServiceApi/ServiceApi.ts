import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ListNames } from "../Enum/ListNames";
import { ISharePointFormColumns } from "../CommonMethods/SharePointListCoulms";

export class ServiceApiClass{
    private web;
    constructor(siteUrl:string){
        this.web= Web(siteUrl);
    }

public async addItems(formdata:ISharePointFormColumns):Promise<any>{
    try{
const list=this.web.lists.getByTitle(ListNames.SharePointList);
const items=await list.items.add({
    Title:formdata.Name
});
return items;
    }
    catch(err){
        console.error("Error occurred while adding item:", err);
        throw err;
    }
}
}