import {sp} from "@pnp/sp/presets/all";
import { IPaginatedColumns } from "../CommonMethods/SharePointListCoulms";
import { ListNames } from "../Enum/ListNames";

export default class PaginatedServiceApiClass{

public static async getPaginationItems():Promise<IPaginatedColumns[]>{

    try{
let allItems:any[]=[];
let paged=await sp.web.lists.getByTitle(ListNames.SharePointList).items.select("Id","Title","Age","EmailAddress","Admin/Title","City/Title")
.expand("Admin","City").top(4999).getPaged(); //max batched 4999 items

//first batch
allItems.push(...paged.results);

//continue fetching next batches
while(paged.hasNext){
    paged=await paged.getNext(); //next page call

    allItems.push(...paged.results);
    console.log(`Fetched  next batch ${paged.results.length}`);
}
console.log(`Fetched total length ${allItems.length}`);

return allItems.map((e:any)=>({
    key:e.key,
    Title:e.Title,
    Age:e.Age,
    EmailAddress:e.EmailAddress,
    Admin:e.Admin?.Title,
    City:e.City?.Title
}));

    }
    catch(err){
console.log(`Error while fetching the items`);
return [];
    }
}
}