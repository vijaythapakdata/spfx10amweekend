import { TextField } from '@fluentui/react';
import * as React from 'react';

const UseMemoHook:React.FC<{}>=()=>{
    const [name,setName]=React.useState<string>("");
  const greeting=React.useMemo(()=>{
console.log("Use memo is called")
return `Hello ${name}`
  },[name]);
return(
    <>
    <p>{greeting}</p>
    <TextField
    label='Name'
    value={name}
    onChange={(e, newValue)=>setName(newValue||"")}
    />
    </>
)
}
export default UseMemoHook;