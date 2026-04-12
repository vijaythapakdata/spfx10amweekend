export interface SharePointList1{
    Name:string;
    isTrue:boolean;
    Skills:any[];
    Age:number;
    City:{
        Title:string
    }
}

export interface SharePointList2{
    ProjectName:string;
    ProjectDuration:string|null;
    Manager:string;
    Department:any;
}