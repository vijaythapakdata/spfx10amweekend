export interface INasaItemData{
    title:string;
    keywords:string[];
    description:string;
}
export interface INasaItemLink{
    href:string;
}
export interface INasaItems{
    data:INasaItemData[];
    links:INasaItemLink[];
}
export interface INasaItemCollection{
    items:INasaItems[];
}
export interface INasaItemResponse{
    collection:INasaItemCollection
}