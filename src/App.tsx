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
import DatePicker from './Components/DatePicker'
import { ParseDateString } from './Services/Datavalidation'
import DailyvalutesBar from './Components/DailyValutes/DailyvalutesBar'

function App() {
  

  const[DictionaryValutes, setDictionaryValutes] = useState<ValuteDictionaryData>(DefaultValuteDictionaryData);

  const[DailyValutes, setDailyValutes] = useState<ValuteRatesToDateData>(defautValuteRatesToDateData);

 

  useEffect(() => {

    if(DictionaryValutes.DailyUpdate.length == 0 || DictionaryValutes.MountlyUpdate.length == 0){

      
      getValutesDuctionary();
      console.log("Загружена библиотека валют");
    }
    

    
    
    /* if(DailyValutes.DailyUpdate.length == 0){

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
    } */


    
  }, [DailyValutes]);


  const getDailyValutesData = async () => {
   

    let xml : XmlEntity| null = await FetchXMLDoc(ValuteFullDictionary(ValuteType.DailyUpdate));   // Assume xmlText contains the example XML.

    
    let newRes: ValuteDictionaryEntity[] = [];

    for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

      if(xml != null) {
        
      let curr= ParseValuteDictionaryEntity(xml.children[index]);

      

      if(curr != undefined) newRes.push(curr);

      }
      
    }


    

    return newRes;
  
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


    return newRes;
  
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

    return newRes;

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

    return newRes;

  }


 const getValutesDuctionary = async () =>{

  const DailyVals = await getDailyValutesData();

  const MonthlyVals = await getMountlyValutesData();

  const newDic : ValuteDictionaryData = {DailyUpdate: DailyVals, MountlyUpdate: MonthlyVals}

  setDictionaryValutes(newDic);

 }

 const getValutesRateToDate = async (date: Date) =>{

  const DailyVals = await getDailyValutesDataToDay(date);

  const MonthlyVals = await getMonthlyValutesDataToDay(date);


  const newvals : ValuteRatesToDateData = {DailyUpdate: DailyVals, MountlyUpdate: MonthlyVals}

  setDailyValutes(newvals);

 }


  const DailyValutedateUpdated = (date: Date) =>{

    

    

    getValutesRateToDate(date);
    console.log("Загружены курсы валют на " + date);

  }

  const update =(source) =>{

const ty = source.target.value;

   const  currentDate =  ParseDateString(source.target.value);

   if(currentDate != undefined) DailyValutedateUpdated(currentDate);

  }


  return (
    <>

      

      {/* <ValuteDictionaryTabs data={DictionaryValutes}/> */}

      

      <DailyvalutesBar dateChanged={update} valutes={DailyValutes}/>

      

    
    </>
  )
}



export default App
