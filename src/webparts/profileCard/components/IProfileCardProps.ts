import { WebPartContext } from "@microsoft/sp-webpart-base";
import {MSGraphClientV3} from "@microsoft/sp-http";
export interface IProfileCardProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  graphClient:MSGraphClientV3;
  context:WebPartContext
}
