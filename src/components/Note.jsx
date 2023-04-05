import React, {useState} from "react";
import axios from "axios";
import {API} from "aws-amplify";

import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui'; 


const myAPI = "apitodolistv1"; //api name in aws api gateway
const path ="/api/toDoList";

function Note(props) {
  
  const [checked, setChecked] = useState(props.toDoList.doneStatus?true:false);

 
  async function handleSelect(event) {
    setChecked((prev) => { return !prev});
    try {
      //await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList/byID`, 
      //{id: event.target.value, task: props.toDoList.task, doneStatus: event.checked});
      await API.patch(myAPI, path+"/byID", {body: {id: event.target.value, task: props.toDoList.task, doneStatus: event.checked}});    
      props.updateStatus();
    } catch (err) {
      console.log(err);
    }
    
  }


  async function handleDelete() {
    try {
      //await axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList/deleteOne`, {id: props.toDoList._id});
      await API.post(myAPI, path+"/deleteOne", {body: {id: props.toDoList._id}})
      props.updateStatus();
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <Card style={{width: "240px", height: "100px", textDecoration: checked? 'line-through':''}}>
      <span>
        <BlockUI blocked={props.deleteStatus}> 
      
        <Checkbox style={{marginRight:"20px"}} inputId={props.toDoList._id} value={props.toDoList._id} checked={checked} onChange={handleSelect}></Checkbox>
        {props.toDoList.task}
        {checked}
        {props.toDoList.doneStatus}
        </BlockUI>
      {
       props.deleteStatus? (<Button style={{float: "right", marginRight:"2px"}} icon="pi pi-trash" 
       className="p-button-rounded p-button-text" onClick={handleDelete}/>):("")
      }
      </span>
    </Card>
  );
};

//<Button label={props.toDoList.task} style={{width: "150px"}} className="p-button-link" onClick={handleSelect}/>
//<Checkbox inputId={props.toDoList._id} value={props.toDoList._id} checked={checked} onChange={handleSelect}></Checkbox>
//<label className="lbl" htmlFor={props.toDoList._id} className="p-checkbox-label">{props.toDoList.task}</label>
//<Button icon="pi pi-trash" className="button p-button-rounded p-button-text" value={props.toDoList._id} onClick={handleDelete}/>

export default Note;