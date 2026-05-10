import { INasaItems } from "../../../CommonMethods/INasaImageResponse";

export interface IGraphApiKeyProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  apollomissionImages:INasaItems
}
