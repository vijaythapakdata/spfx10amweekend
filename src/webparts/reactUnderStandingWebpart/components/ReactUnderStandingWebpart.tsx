import * as React from 'react';
import styles from './ReactUnderStandingWebpart.module.scss';
import type { IReactUnderStandingWebpartProps } from './IReactUnderStandingWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BasicForm from '../../../ReactExplaination/BasicForm';
import UseStateHook from '../../../ReactHooks/UseStateHook';
import { ListNames } from '../../../Enum/ListNames';
import UseEffectHook from '../../../ReactHooks/UseEffectHook';
import UseCallbackHook from '../../../ReactHooks/UseCallbackHooks';
import UseMemoHook from '../../../ReactHooks/UseMemoHook';
// Functional component

const  ReactUnderStandingWebpart:React.FC<IReactUnderStandingWebpartProps>=(props)=>{
//ways to define variables

//const ->it is constant means it can not updated after assigning

const num1=45;
console.log(num1);

//let -> it is volatile means we can update the value after assigning

let num2=90;
console.log(num2);

//updating the value
num2=190;
console.log(num2);

//older way to decaler variable

var num3=7;
console.log(num3);
num3=90;
console.log(num3);

//function
const dataTypesFunction=()=>{
  //data types in react
  //string
  const name="Vijay thapak";
  console.log(typeof(name));
console.log(name);

//array 
const fruits=["Apple","Mango","Grapes"];
console.log(fruits);

//boolean
const isTrue=true;
console.log(typeof(isTrue));

//integer
const num1=34;
console.log(num1);

//float
const nump=10.5
console.log(nump);

//loops in react 

//foreach loop
console.log("****I am foreach looop*****")
fruits.forEach((item)=>{
  console.log(item);
});

//for loop
console.log("****I am for looop*****")

for(let i=0;i<fruits.length;i++){
  console.log(fruits[i]);
}
//while loop
let j=0;
console.log("****I am while looop*****")
while(j<fruits.length){
  console.log(fruits[j]);
  j++;
}

//do while loop
let k=0;
console.log("****I am do while looop*****")
do{
  console.log(fruits[k]);
  k++;
}
while(k<fruits.length);

//conditional statement
let age =36;
if(age<18){
  console.log("You can not caste the vote");
}
else if(age>=18){
console.log("you can cast the vote");
}
else{
  console.log("Invalid age")
}
//swtich case

let day=3;
let dayName="";
switch(day){
  case 1:
    dayName="Sunday"
    break;
  case 2:
    dayName="Monday"
    break;
  case 3:
    dayName="Tuesday"
    break;
  case 4:
    dayName="Wednesday"
    break;
  case 5:
    dayName="Thursday"
    break;
  case 6:
    dayName="Friday"
    break;
  case 7:
    dayName="Saturday"
    break;
  default:
    dayName="Invalid day"
}
console.log(dayName);

// conversion

let num2=34;
let num3="34";
console.log(num2+parseInt(num3)); // 34 34 68 error

//conact
let fname="Vijay";
let lname="Thapak";
console.log(fname+" "+lname); //vijay thapak

//second way
console.log(fname.concat(" "+lname));

//includes
let fullName="Vijay Thapak";
let Iam="   I am vijay     "
console.log(fullName.includes("Vijay")); //true
console.log(fullName.toLowerCase().includes("vijay"));//ture

console.log(fullName.length);//11
console.log(fullName.toUpperCase());
console.log(Iam.trim());

//how to add two array without using third varaible
let arr1=[1,2,3,4,5]
let arr2=[6,7,8,9,10];
//spread operator
console.log(...arr1,...arr2);

//locale string
let amount=9000092
console.log(amount.toLocaleString("en-In",{style:"currency",currency:"INR"}));
let date=new Date();
console.log(date.toLocaleString("en-In"));

console.log(fruits.join(","));
 

let result=fruits.filter((n)=>n.includes("o"));
 console.log(result)

}
//aray
let name=["Aman","Karan","Arun","Sohail"]


  return(
    <><p>hi hello</p>
    
    {/* Basic form component */}
    <BasicForm/>

    {/* calling function */}
    {dataTypesFunction()}
    {/* map funcion */}
    {name.map((item)=>{
     return <p key={item}>{item}</p>
    })}
    {ListNames.list1}
    <UseStateHook/>
    <UseEffectHook/>
    <UseCallbackHook/>
    <UseMemoHook/>
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
