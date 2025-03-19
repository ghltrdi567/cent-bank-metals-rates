import { useState, useEffect } from 'react'
import React from 'react'
//import reactLogo from '/assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import {FetchXMLDoc, ValuteDictionaryEntity, XmlEntity} from './Models/ApiEntities'
import ValuteDictionaryTable from './Components/ValuteDictionary/ValuteDictionaryTable'
import { ParseValuteDictionaryEntity } from './Services/DataExtract'
import ValuteDictionaryTabs, { DefaultValuteDictionaryData, ValuteDictionaryData } from './Components/ValuteDictionary/ValuteDictionaryTabs'

function App() {
  

  

  const[DictionaryValutes, setDictionaryValutes] = useState<ValuteDictionaryData>(DefaultValuteDictionaryData);

  useEffect(() => {



    if(DictionaryValutes.DailyUpdate.length == 0){

      console.log("daily");
      getDailyValutesData();
    }
    else{

      console.log(DictionaryValutes.DailyUpdate);
    }

    if(DictionaryValutes.MountlyUpdate.length == 0){

      console.log("mount");
      getMountlyValutesData();
    }
    else{
      console.log(DictionaryValutes.MountlyUpdate);
    }
    

    
  }, [DictionaryValutes]);


  const getDailyValutesData = async () => {
   

    let xml : XmlEntity| null = await FetchXMLDoc("https://www.cbr.ru/scripts/XML_valFull.asp?d=0");   // Assume xmlText contains the example XML.

    
    let newRes: ValuteDictionaryEntity[] = [];

    for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

      if(xml != null) {
        
      let curr= ParseValuteDictionaryEntity(xml.children[index]);

      

      if(curr != undefined) newRes.push(curr);

      }
      
    }


    

    const NewData: ValuteDictionaryData = {DailyUpdate: newRes, MountlyUpdate: DictionaryValutes.MountlyUpdate}


    
    setDictionaryValutes(NewData);
  
  };


  const getMountlyValutesData = async () => {
   

    let xml : XmlEntity| null = await FetchXMLDoc("https://www.cbr.ru/scripts/XML_valFull.asp?d=1");   // Assume xmlText contains the example XML.

    let newRes: ValuteDictionaryEntity[] = [];

    for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

      if(xml != null) {
        
      let curr= ParseValuteDictionaryEntity(xml.children[index]);

      if(curr != undefined) newRes.push(curr);

      }
      
    }


    

    const NewData: ValuteDictionaryData = {DailyUpdate: DictionaryValutes.DailyUpdate, MountlyUpdate: newRes}

    
    setDictionaryValutes(NewData);
  
  };

  return (
    <>

      

      <ValuteDictionaryTabs data={DictionaryValutes}/>

    
    </>
  )
}



export default App
