import { useState, useEffect } from 'react'
import React from 'react'
//import reactLogo from '/assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import {FetchXMLDoc, ValuteDictionaryEntity, ValuteRateEntity, XmlEntity} from './Models/ApiEntities'
import ValuteDictionaryTable from './Components/ValuteDictionary/ValuteDictionaryTable'
import { ParseValuteDictionaryEntity, ParseValuteRateEntity } from './Services/DataExtract'
import ValuteDictionaryTabs, { DefaultValuteDictionaryData, ValuteDictionaryData } from './Components/ValuteDictionary/ValuteDictionaryTabs'
import DailyValitesTabs, { ValuteRatesToDateData, defautValuteRatesToDateData } from './Components/DailyValutes/DailyValitesTabs'
import { ValuteDictionary, ValuteFullDictionary, ValuteRateToDate, ValuteType } from './Services/ApiStrings'

function App() {
  

  const[DictionaryValutes, setDictionaryValutes] = useState<ValuteDictionaryData>(DefaultValuteDictionaryData);

  const[DailyValutes, setDailyValutes] = useState<ValuteRatesToDateData>(defautValuteRatesToDateData);

  useEffect(() => {

    if(DictionaryValutes.DailyUpdate.length == 0){

      
      getDailyValutesData();
    }
    else{

      console.log("Загружена библиотека валют, курс которых обновляется ежедневно");
    }

    if(DictionaryValutes.MountlyUpdate.length == 0){

      
      getMountlyValutesData();
    }
    else{
      console.log("Загружена библиотека валют, курс которых обновляется ежемесячно");
    }
    

    if(DailyValutes.DailyUpdate.length == 0){

      getDailyValutesDataToDay(new Date(2007, 1, 1))


    }
    else{
      console.log("Загружены курсы валют, курс которых обновляется ежедневно");
    }

    if(DailyValutes.MountlyUpdate.length == 0){

      getMonthlyValutesDataToDay(new Date(2007, 1, 1))


    }
    else{
      console.log("Загружены курсы валют, курс которых обновляется ежемесячно");
    }


    
  }, [ DictionaryValutes, DailyValutes]);


  const getDailyValutesData = async () => {
   

    let xml : XmlEntity| null = await FetchXMLDoc(ValuteFullDictionary(ValuteType.DailyUpdate));   // Assume xmlText contains the example XML.

    
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
   

    let xml : XmlEntity| null = await FetchXMLDoc(ValuteFullDictionary(ValuteType.MounthUpdate));   // Assume xmlText contains the example XML.

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

  const getDailyValutesDataToDay = async (date: Date) =>{

    let xml : XmlEntity| null = await FetchXMLDoc(ValuteRateToDate(ValuteType.DailyUpdate, date));

    let newRes: ValuteRateEntity[] = [];


    for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

      if(xml != null) {
        
      let curr= ParseValuteRateEntity(xml.children[index]);

      if(curr != undefined) newRes.push(curr);

      }
      
    }

    const NewData: ValuteRatesToDateData = {DailyUpdate: newRes, MountlyUpdate: DailyValutes.MountlyUpdate}
    //console.log(NewData);

    setDailyValutes(NewData);

  }

  const getMonthlyValutesDataToDay = async (date: Date) =>{

    let xml : XmlEntity| null = await FetchXMLDoc(ValuteRateToDate(ValuteType.MounthUpdate, date));

    let newRes: ValuteRateEntity[] = [];


    for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

      if(xml != null) {
        
      let curr= ParseValuteRateEntity(xml.children[index]);

      if(curr != undefined) newRes.push(curr);

      }
      
    }

    const NewData: ValuteRatesToDateData = {MountlyUpdate: newRes, DailyUpdate: DailyValutes.DailyUpdate}
    //console.log(NewData);

    setDailyValutes(NewData);

  }

  return (
    <>

      

      {/* <ValuteDictionaryTabs data={DictionaryValutes}/> */}

      <DailyValitesTabs data={DailyValutes}/>

    
    </>
  )
}



export default App
