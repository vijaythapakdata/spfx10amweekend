import * as React from 'react';
import { ISharePointFormColumns } from './SharePointListCoulms';
import { IDropdownOption } from '@fluentui/react';

export const handleSkillsChange=(options:IDropdownOption,formdata:ISharePointFormColumns,setFormdata:React.Dispatch<React.SetStateAction<ISharePointFormColumns>>)=>{
   const selectedkey=options.selected?[...formdata.Skills,options?.key as string]:
   formdata.Skills.filter((key:any)=>key!==options);
   setFormdata(opt=>({...opt,Skills:selectedkey}));
    
}