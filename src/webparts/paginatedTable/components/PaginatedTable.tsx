import * as React from 'react';
import styles from './PaginatedTable.module.scss';
import type { IPaginatedTableProps } from './IPaginatedTableProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState,useEffect } from 'react';
import PaginatedServiceApiClass from '../../../ServiceApi/PaginatedService';
import { Input,Table } from 'antd';
import { Dropdown, IDropdownOption, initializeIcons, PrimaryButton } from '@fluentui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

initializeIcons();

const pagedItems:IDropdownOption[]=[
  {key:5,text:"5 items"},
  {key:10,text:"10 items"},
  {key:15,text:"15 items"},
  {key:20,text:"20 items"},
]
const PaginatedTable:React.FC<IPaginatedTableProps>=(props)=>{
  const [allItems,setAllItems]=useState<any[]>([]);
  const [searchText,setSearchText]=useState<string>('');
  const [loading,setLoading]=useState<boolean>(false);
  const [pageSize,setPageSize]=useState<number>(5);
  const [page,setpage]=useState<number>(1);

  useEffect(()=>{
const loadList=async()=>{
  setLoading(true);
  const response=await PaginatedServiceApiClass.getPaginationItems();
  setAllItems(response);
  setLoading(false);
}
loadList();
  },[]);


const filtereditems=allItems.filter((items)=>items?.Title?.toLowerCase().includes(searchText.toLowerCase())||
items?.EmailAddress?.toLowerCase().includes(searchText.toLowerCase())||
items?.Admin?.toLowerCase().includes(searchText.toLowerCase())
|| items?.City?.toLowerCase().includes(searchText.toLowerCase())||
items?.Age?.toString().includes(searchText)
);

//Pagination
const paginatedItems=filtereditems.slice((page-1) * pageSize, page*pageSize);

//slice(startIndext,endIndex)
// page=2=2-1=1*10=10
// 2*10=20 (10,20)=>

const columns=[
  {
    title:"Name",
    dataIndex:"Title",
    key:"Title",
    sorter:(a:any,b:any)=>(a.Title||"").localeCompare(b.Title||"")
  },
  {
title:"Age",
dataIndex:"Age",
key:"Age",
sorter:(a:any,b:any)=>(a.Age||0)-(b.Age||0)
  },
  {
    title:"Email Address",
    dataIndex:"EmailAddress",
    key:"EmailAddress",
    sorter:(a:any,b:any)=>(a.EmailAddress||"").localeCompare(b.EmailAddress||"")
  },
  {
    title:"Admin",
    dataIndex:"Admin",
    key:"Admin",
    sorter:(a:any,b:any)=>(a.Admin||"").localeCompare(b.Admin||"")
  },
  {
    title:"City",
    dataIndex:"City",
    key:"City",
    sorter:(a:any,b:any)=>(a.City||"").localeCompare(b.City||"")
  }
]
//search box
const handleSearch=(e:any)=>setSearchText(e.target.value);

// export to excel
const exporttoexcel=()=>{
  const workSheet=XLSX.utils.json_to_sheet(filtereditems);
  const workbooks=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbooks,workSheet,"Splistdata");
  XLSX.writeFile(workbooks,"Splistdata.xlsx");
}

//export to pdf

const exporttopdf=()=>{
  const doc=new jsPDF();
  doc.text("sharepoint list items",10,10);
  const tablerows:any[]=[];
  filtereditems.forEach((items)=>{
    tablerows.push([items.Title,items.Age,items.EmailAddress,items.Admin,items.City]);
  });
  autoTable(doc,{
    head:[["Name","Age","Email Address","Admin","City"]],
    body:tablerows,
    startY:20
  });
  doc.save("splistitems.pdf");
}
  return(
    <>
    {/* search box */}
    <Input
    placeholder='search here....'
    style={{marginBottom:20,width:"300px"}}
    value={searchText}
    onChange={handleSearch}
    />
    {/* Page Size */}
    <Dropdown
  options={pagedItems}
     style={{marginBottom:20,width:"300px"}}
     label='select page size'
     onChange={(_,opt)=>{
      setPageSize(opt?.key as any);
      setpage(1);
     }}
    />
    {/* Export to excel */}
    <div style={{marginBottom:20,display:'flex',gap:'10px'}}>
      <PrimaryButton
      text='Export to Excel'
      iconProps={{iconName:'File'}}
      onClick={exporttoexcel}
      styles={{root:{backgroundClip:"green",border:"green"}}}
      />
{/* exporrt to pdf */}
<PrimaryButton
      text='Export to PDF'
      iconProps={{iconName:'pdf'}}
      onClick={exporttopdf}
      styles={{root:{backgroundClip:"red",border:"red"}}}
      />
    </div>
    {/* Table */}
    <Table
    columns={columns}
    dataSource={paginatedItems}
    loading={loading}
    pagination={{
      current:page,
      pageSize:pageSize,total:filtereditems.length,
      onChange:(e)=>setpage(e)

    }}
    rowKey="key"
    />
    </>
  )
}
export default PaginatedTable;
