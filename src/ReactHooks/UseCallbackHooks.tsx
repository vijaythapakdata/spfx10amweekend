import { TextField } from '@fluentui/react';
import * as React from 'react';


const UseCallbackHook:React.FC<{}>=()=>{
    const [name,setName]=React.useState<string>("");
const handleChange=React.useCallback((_any,val?:string)=>{
setName(val||"")
},[name])
return(
    <>
    <p>My Name is:{name}</p>
    <TextField
    label='Name'
    value={name}
    onChange={handleChange}
    />
    </>
)
}
export default UseCallbackHook;