import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { useState } from 'react';

const UseStateHook:React.FC<{}>=()=>{
    const [count,setCount]=useState<number>(0);
    return(
        <>
        <p>Counter :{count}</p>
        <PrimaryButton
        text='Count'
        onClick={()=>setCount(count+1)}
        iconProps={{iconName:'add'}}
        />
        </>
    )
}
export default UseStateHook