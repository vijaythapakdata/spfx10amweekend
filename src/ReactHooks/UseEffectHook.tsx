import { TextField } from '@fluentui/react';
import * as React from 'react';

const UseEffectHook:React.FC<{}>=()=>{
    const [name,setName]=React.useState<string>("");
    React.useEffect(()=>{
console.log("Use effect is called")
    },[name])
return(
    <>
    <p>My Name is:{name}</p>
    <TextField
    label='Name'
    value={name}
    onChange={(e, newValue)=>setName(newValue||"")}
    />
    </>
)
}
export default UseEffectHook;