import * as React from 'react';
// import styles from './FormValidation.module.scss';
import type { IFormValidationProps } from './IFormValidationProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { FormikService } from '../../../ServiceApi/FormikSerivce';
import { Formik, FormikProps } from 'formik';
 import * as Yup from 'yup';
import { Dialog } from '@microsoft/sp-dialog';
import { DatePicker, Dropdown, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {sp} from "@pnp/sp/presets/all";
const stacktokens={
  childrenGap:15
}
const  FormValidation:React.FC<IFormValidationProps>=(props)=>{
  const [service,setService]=React.useState<ReturnType<typeof FormikService>|null>(null);

  React.useEffect(()=>{
sp.setup({
        spfxContext:props.context as any
      });
setService(FormikService());
  },[props.context,props.siteurl]);

   const SignupSchema = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    details:Yup.string().min(15,"Minimum 15 characters are required").required("Details are required"),
    startDate:Yup.date().required("Start Date is required"),
    endDate:Yup.date().required("End date is required"),
    projectName:Yup.string().required("Project Name is required"),
    phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}/,"Phone number must be 10 number"),
    emailAddress:Yup.string().email("Invalida email format").required("Email Address is required")
    .test("Invalid =domain","Personal email domains(hotmail.coom,gamil.con,yahoo.com,onmicrosoft.com are not allowed)",

      (value)=>{
        if(!value)return false;
        const email=value.toLowerCase();
        //block all personal domains
        const blockedomains=["hotmail.com","gmail.com","yahoo.com","onmicrosoft.com"];
        return !blockedomains.some(domai=>email.endsWith(domai));
      }
    )
   });

   const getFieldProps=(formik:FormikProps<any>,field:string)=>({
    ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
   });
const addrecord=async(items:any)=>{
  try{
if(!service)return;
const item=await service.createItems({
  Title:items.name,
TaskDetails:items.details,
StartDate:items.startDate,
EndDate:items.endDate,
ProjectName:items.projectName,
EmailAddress:items.emailAddress,
PhoneNumber:items.phoneNumber
});
Dialog.alert("saved");
console.log(item);
  }
  catch(err){
console.log(err);
  }
}

  return(
    <>
    
    <Formik
    initialValues={{
      name:"",
      details:"",
      startDate:"",
      endDate:"",
      projectName:"",
      emailAddress:"",
      phoneNumber:""
    }}
    validationSchema={SignupSchema}
    onSubmit={(values,helper)=>{
      addrecord(values).then(()=>helper.resetForm());
    }}
    >
      {(formik:FormikProps<any>)=>(
        <form onSubmit={formik.handleSubmit}>
<Stack tokens={stacktokens}>
<PeoplePicker
context={props.context as any}
titleText='User Name'
disabled={true}
principalTypes={[PrincipalType.User]}
defaultSelectedUsers={[props.context.pageContext.user.displayName]}
ensureUser={true}
webAbsoluteUrl={props.siteurl}
showtooltip={true}


/>
<TextField
label='Name'
{...getFieldProps(formik,"name")}
/>
<TextField
label='Email Address'
{...getFieldProps(formik,"emailAddress")}
/>
<TextField
label='Phone Number'
{...getFieldProps(formik,"phoneNumber")}
/>
<Dropdown
label='Project Name'
options={[
  {key:"Project A",text:"Project A"},
   {key:"Project B",text:"Project B"},
    {key:"Project C",text:"Project C"},
     {key:"Project D",text:"Project D"}
]}
onChange={(_,e)=>formik.setFieldValue("projectName",e?.key as string)}
errorMessage={formik.errors.projectName as string}
/>
<DatePicker
label='Start Date'
value={formik.values.startDate}
textField={{...getFieldProps(formik,"startDate")}}
onSelectDate={(date)=>formik.setFieldValue("startDate",date)}
/>
<DatePicker
label='End Date'
value={formik.values.endDate}
textField={{...getFieldProps(formik,"endDate")}}
onSelectDate={(date)=>formik.setFieldValue("endDate",date)}
/>
<TextField
label='Task Details'
{...getFieldProps(formik,"details")}
multiline
rows={3}
/>
</Stack>
<br/>
<PrimaryButton
text='Save'
type='submit'
iconProps={{iconName:'save'}}
/>
&nbsp;&nbsp;&nbsp;&nbsp;
<PrimaryButton
text='Cancel'
iconProps={{iconName:'cancel'}}
onClick={formik.handleReset as any}
/>
        </form>
      )}

    </Formik>
    </>
  )
}

export default  FormValidation;