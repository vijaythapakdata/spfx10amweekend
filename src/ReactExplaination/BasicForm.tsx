import * as React from 'react';
import { ChoiceGroup, ComboBox, DatePicker, Dropdown, PrimaryButton, Slider, TextField } from '@fluentui/react';
import { ListNames } from '../Enum/ListNames';
const BasicForm:React.FC<{}>=()=>{
    return(
        <>
        <p>I am child componnet</p>
        <form>
<TextField
label='Name'
placeholder='Enter your name here...'
required
iconProps={{iconName:'people'}}

/>
{/* Email TextField */}
<TextField
label='Email Address'
type='mail'
placeholder='Enter your email here...'
required
iconProps={{iconName:'mail'}}

/>

{/* Password */}
<TextField
label='Password'
type='password'
canRevealPassword={true}


/>

{/* File Type */}

<TextField
label='File'
type='file'



/>

{/* Componensation */}

<TextField
label='Salary'
prefix='$'
suffix='USD'
/>

{/* Dropdown */}

<Dropdown
label='Department'
placeholder='--select--'
options={[
    {key:"IT",text:"IT"},
    {key:"HR",text:"HR"},
    {key:"Finance",text:"Finance"}
]}
multiSelect
/>
{/* Radio button */}
<ChoiceGroup
label='Gender'
options={[
    {key:"Male",text:"Male"},
    {key:"Female",text:"Female"}
]}
/>
{/* Search able dropdown */}
<ComboBox
label='Skills'
placeholder='--select--'
options={[
    {key:"App development",text:"App Development"},
    {key:"Public speaking",text:"Public speaking"}
]}
allowFreeform
autoComplete='on'
/>
{/* Slider */}
<Slider
label='Experience'
min={0}
max={10}
step={0.1}
showValue
/>
{/* Calenadr */}
<DatePicker
label='DOJ'

/>
{/* Multiline text field */}
<TextField
label='Comments'
multiline
rows={3}
/>
<br/>
<PrimaryButton
text='Save'
iconProps={{iconName:"save"}}
onClick={()=>alert("Submit form")}
/>
{ListNames.list2}
        </form>
        </>
    )
}
export default BasicForm;