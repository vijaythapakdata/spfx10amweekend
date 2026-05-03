import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPaginatedTableProps {
  description: string;
  context:WebPartContext;
  siteurl:string;
}
