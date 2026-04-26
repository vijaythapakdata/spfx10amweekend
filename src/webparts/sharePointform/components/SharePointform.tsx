import * as React from 'react';
import styles from './SharePointform.module.scss';
import type { ISharePointformProps } from './ISharePointformProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISharePointFormColumns } from '../../../CommonMethods/SharePointListCoulms';
import { ServiceApiClass } from '../../../ServiceApi/ServiceApi';
import { useState,useEffect,useCallback } from 'react';
import {sp} from "@pnp/sp/presets/all";
import { Dialog } from '@microsoft/sp-dialog';
import { ChoiceGroup, Dropdown, PrimaryButton, TextField } from '@fluentui/react';
import { handleSkillsChange } from '../../../CommonMethods/Imultiselectdropdown';
const SharePointform:React.FC<ISharePointformProps>=(props)=>{
  const [formdata,setFormData]=useState<ISharePointFormColumns>({
    Name:"",
    Skills:[],
    Department:"",
    Gender:"",
    City:""
  });
 
  

  const createForm=async()=>{
    try{
const _service=new ServiceApiClass(props.siteurl);
const result=await _service.addItems(formdata);
Dialog.alert("Form submitted successfully");
console.log(result);
setFormData({
  Name:"",
   Skills:[],
    Department:"",
    Gender:"",
    City:""
})
    }
    catch(err){
      Dialog.alert("Error occurred while submitting form");
    }
  }

  const handleSubmit=useCallback((field:keyof ISharePointFormColumns,value:string):void=>{
    setFormData(prev=>({...prev,[field]:value}))
  },[])
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(_,newValue)=>handleSubmit("Name",newValue || "")}
    />
    {/* Department */}
    <Dropdown
    label='Department'
    options={props.departmentoptions}
    selectedKey={formdata.Department}
    onChange={(_,options)=>handleSubmit("Department",options?.key as string)}
    placeholder='--select--'

    />
    {/* City */}
    <Dropdown
    label='City'
    options={props.citiesoptions}
    selectedKey={formdata.City}
    onChange={(_,options)=>handleSubmit("City",options?.key as string)}
    placeholder='--select--'
    
    />
    {/* Skills */}
    <Dropdown
    label='Skills'
    options={props.skillsoptions}
  defaultSelectedKey={formdata.Skills}
  onChange={(_,opt)=>handleSkillsChange(opt!,formdata,setFormData)}
    placeholder='--select--'
    multiSelect
    
    />
    {/* gender */}
    <ChoiceGroup
    label='Gender'
    options={props.genderoptions}
    selectedKey={formdata.Gender}
    onChange={(_,options)=>handleSubmit("Gender",options?.key as string)}
   
    
    />


    <br/>
    <PrimaryButton
    text="Save"
    onClick={()=>createForm()}
    iconProps={{iconName:'save'}}
    />
    </>
  )
}
export default SharePointform;
