import * as React from 'react';
import styles from './ProfileCard.module.scss';
import type { IProfileCardProps } from './IProfileCardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState,useEffect } from 'react';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import {GraphError,ResponseType} from "@microsoft/microsoft-graph-client";
import { Link, Persona, PersonaSize } from '@fluentui/react';
import { LivePersona } from '@pnp/spfx-controls-react';

const  ProfileCard:React.FC<IProfileCardProps>=(props)=>{
  const [name,setName]=useState<string>('');
  const [mail,setMail]=useState<string>('');
  const [phone,setPhone]=useState<string>('');
  const [image,setImage]=useState<string>('');

useEffect(()=>{

  props.graphClient.api('me')
  .get((err:GraphError,user:MicrosoftGraph.User)=>{
    if(!err){
      setName(user.displayName||''),
      setMail(user.mail||""),
      setPhone(user.businessPhones?.[0]||"")
    }
  });
  props.graphClient.api('me/photo/$value')
  .responseType(ResponseType.BLOB)
  .get((err:GraphError,photoresponse:Blob)=>{
    const bloburl=URL.createObjectURL(photoresponse);
    setImage(bloburl);
  });
},[props.graphClient]);

//rendered phone
const renderPhone=():JSX.Element|null=>{
  return phone?<Link href={`tel:${phone}`}>{phone}</Link>:<div/>
}
const renderMail=():JSX.Element|null=>{
  return mail?<Link href={`mailto:${mail}`}>{mail}</Link>:<div/>
}
  return(
    <>
    <LivePersona
    upn={mail}
    template={
      <>
      <Persona
      text={name}
      secondaryText={mail}
      onRenderSecondaryText={renderMail}
      tertiaryText={phone}
      onRenderTertiaryText={renderPhone}
      imageUrl={image}
      size={PersonaSize.size100}
      
      />
      </>
    }
    serviceScope={props.context.serviceScope as any}
    >

    </LivePersona>
    </>
  )
}
export default  ProfileCard;
