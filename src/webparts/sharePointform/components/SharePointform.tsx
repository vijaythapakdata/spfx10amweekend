import * as React from 'react';
import styles from './SharePointform.module.scss';
import type { ISharePointformProps } from './ISharePointformProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISharePointFormColumns } from '../../../CommonMethods/SharePointListCoulms';
import { ServiceApiClass } from '../../../ServiceApi/ServiceApi';
import { useState,useEffect,useCallback } from 'react';
import {sp} from "@pnp/sp/presets/all";
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, TextField } from '@fluentui/react';
const SharePointform:React.FC<ISharePointformProps>=(props)=>{
  const [formdata,setFormData]=useState<ISharePointFormColumns>({
    Name:""
  });
 
  useEffect(()=>{
  
sp.setup({
  spfxContext:props.context as any
});
  },[]);

  const createForm=async()=>{
    try{
const _service=new ServiceApiClass(props.siteurl);
const result=await _service.addItems(formdata);
Dialog.alert("Form submitted successfully");
console.log(result);
setFormData({
  Name:""
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
