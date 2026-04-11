import * as React from 'react';
import styles from './ReactUnderStandingWebpart.module.scss';
import type { IReactUnderStandingWebpartProps } from './IReactUnderStandingWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BasicForm from '../../../ReactExplaination/BasicForm';


// Functional component

const  ReactUnderStandingWebpart:React.FC<IReactUnderStandingWebpartProps>=(props)=>{
  return(
    <><p>hi hello</p>
    
    {/* Basic form component */}
    <BasicForm/>
    </>
    
  )
}
export default  ReactUnderStandingWebpart;

// export default class ReactUnderStandingWebpart extends React.Component<IReactUnderStandingWebpartProps> {
//   public render(): React.ReactElement<IReactUnderStandingWebpartProps> {
  

//     return (
//      <>
//      <p>hello world using class component</p>
//      </>
//     );
//   }
// }
