import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {API} from "aws-amplify";

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputList from "./components/InputList";
import Note from "./components/Note";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const myAPI = "apitodolistv1";
const path ="/api/toDoList";

function App() {

  const [toDoLists, setToDoList] = useState([]);
  const [doneLists, setDoneList] = useState([]);
  const [allLists, setAllList] = useState([]);
  const [status, setStatus] = useState(false);
  const [forDelete, setForDelete] = useState(false);
  const toastBR = useRef(null);
  

  function showConfirm() {
    toastBR.current.show({ severity: 'warn', sticky: true, content: (
        <div className="p-flex p-flex-column" style={{flex: '1'}}>
            <div className="p-text-center">
                <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                <h4>Are you sure to delete all?</h4>
                <p>Confirm to proceed</p>
            </div>
            <div className="p-grid p-fluid">
                <div className="p-col-6">
                    <Button type="button" label="Yes" className="p-button-success" onClick={handleDeleteAll}/>
                </div>
                <div className="p-col-6">
                    <Button type="button" label="No" className="p-button-secondary" onClick={clearToast}/>
                </div>
            </div>
        </div>
    ) });
  }

  function clearToast() {
    toastBR.current.clear();
  }

  function updateStatus() {
    setStatus((prevState) => {
      return !prevState;
    });
  }

  function enableDelete() {
    setForDelete( (prev) => {
      return !prev
    });
  }

  async function handleDeleteAll() {
    clearToast();
    try {
      //await axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList/deleteAll`);
      await API.post(myAPI, path+"/deleteAll")
      updateStatus();
      enableDelete();
    } catch (err) {
      console.log(err);
    }
  }

  // function fetchToDo() {
  //   const criteria = {};
  //   const options = {
  //     url: `${process.env.REACT_APP_API_ENDPOINT}api/toDoList/false`,
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     data: criteria
  //   };
  //   axios(options).then(result => {
  //     setToDoList(result.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }
  //
  // async function fetchDone() {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList/true`);
  //     setDoneList(res.data);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  async function fetchAll() {
    try {
      //const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/toDoList`);
      const res = await API.get(myAPI, path);
      setToDoList(res.filter(item => !item.doneStatus));
      setDoneList(res.filter(item => item.doneStatus));
      setAllList(res);
      //setToDoList(res.data.filter(item => !item.doneStatus));
      //setDoneList(res.data.filter(item => item.doneStatus));
      //setAllList(res.data);

    }
    catch (err) {
      console.log(err);
    }
  }


  useEffect( () => {
    //console.log(process.env);
    fetchAll();
  }, [status])


  return (
    <div>
      <Toast ref={toastBR} position="bottom-right" />
      <Header />
      <InputList updateStatus={updateStatus}/>
      <TabView>
        <TabPanel header={"Outstanding (".concat(toDoLists.length).concat(")")}>

        {forDelete? <Button label="Delete All" className="p-button-rounded p-button-danger" onClick={showConfirm}/>:""}
             {
               toDoLists.map( (list) => {
                return <Note toDoList={list} key={list._id} updateStatus={updateStatus}
                  deleteStatus={forDelete}/>
               })
             }
        </TabPanel>
        <TabPanel header={"Finished (".concat(doneLists.length).concat(")")}>
        {forDelete? <Button label="Delete All" className="p-button-rounded p-button-danger" onClick={showConfirm}/>:""}
            {
               doneLists.map( (list) => {
                return <Note toDoList={list} key={list._id} updateStatus={updateStatus}
                  deleteStatus={forDelete}/>
               })
             }
        </TabPanel>
        <TabPanel header={"All (".concat(allLists.length).concat(")")}>
        {forDelete? <Button label="Delete All" className="p-button-rounded p-button-danger" onClick={showConfirm}/>:""}
            {
               allLists.map( (list) => {
                return <Note toDoList={list} key={list._id} updateStatus={updateStatus} deleteStatus={forDelete}/>
               })
             }
        </TabPanel>
      </TabView>
      {
        (allLists.length === 0)?(""):forDelete?
        (<div className="delete-icon" style={{ position: 'relative', height: '350px' }}>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={enableDelete}/>
        </div>):
        (<div className="delete-icon" style={{ position: 'relative', height: '350px' }}>
        <Button icon="pi pi-trash" className="p-button-rounded" onClick={enableDelete}/>
        </div>)
      }

      <Footer />
    </div>
  );
}

export default App;
