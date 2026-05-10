import * as React from 'react';
import styles from './GetAllUsers.module.scss';
import type { IGetAllUsersProps } from './IGetAllUsersProps';
import { escape } from '@microsoft/sp-lodash-subset';
// import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { IUsersInfo } from '../../../CommonMethods/SharePointListCoulms';
import { useState,useCallback } from 'react';
import { DetailsList, PrimaryButton, SearchBox, Spinner } from '@fluentui/react';
const GetAllUsers:React.FC<IGetAllUsersProps>=(props)=>{
const [users,setUsers]=useState<IUsersInfo[]>([]);
const [search,setSearch]=useState<string>('');
const [nextLink,setNextLink]=useState<string|null>(null);
const [loading,setLoading]=useState<boolean>(false);

const getusers=useCallback(async(url?:string)=>{
setLoading(true);
const client=await props.graphClient.getClient("3");
const response=url? await client.api(url).get():await client.api("/users")
.version("v1.0").select("id,displayName,mail,department,jobTitle").top(5).get()

const list:IUsersInfo[]=response.value.map((u:any)=>({
  id:u.id,
  displayName:u.displayName,
  mail:u.mail,
  department:u.department,
  jobTitle:u.jobTitle
}));
setUsers(list);
setNextLink(response['@odata.nextLink']||null);
setLoading(false);

},[props.graphClient]);

//next page
const nextPage=()=>{
  if(nextLink) getusers(nextLink);
}

// search functionality

const filtereditems=users.filter((items)=>items?.displayName?.toLowerCase().includes(search.toLowerCase())||
items?.mail?.toLowerCase().includes(search.toLowerCase())||
items?.department?.toLowerCase().includes(search.toLowerCase())
|| items?.jobTitle?.toLowerCase().includes(search.toLowerCase())

);
  return(
    <>
    <PrimaryButton
    text='Get Users'
    onClick={()=>getusers()}
    iconProps={{iconName:"user"}}
    style={{marginBottom:20}}
    />
    <SearchBox
    style={{marginBottom:20}}
     iconProps={{iconName:"searchbox"}}
     value={search}
     onChange={(_,val)=>setSearch(val||"")}
    />
    {loading&&<Spinner label='loading users....'/>}
    {/* Detailist */}
    <DetailsList
    items={filtereditems}
    />
    {nextLink&&(
      <PrimaryButton
        style={{marginBottom:20}}
     iconProps={{iconName:"next"}}
     onClick={nextPage}
     text='Next Page'
      />
    )}
    </>
  )
}
export default GetAllUsers;
