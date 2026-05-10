export interface ISharePointFormColumns{
    Name:string;
    Department:string;
    City:string;
    Gender:string;
    Skills:any;
}

export interface IPaginatedColumns{
    key:number;
    Title:string;
    Age:number;
    Admin:number;
    City:string;
    EmailAddress:string;
}
export interface IUsersInfo{
    id:string;
    displayName:string;
    mail:string;
    jobTitle?:string;
    department?:string;
}