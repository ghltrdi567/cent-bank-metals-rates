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
import DynamicValutesRatesBar from './Components/DynamicValuteRates/DynamicValutesRatesBar'
import DynamicMetalsBar from './Components/DynamicMetals/DynamicMetalsBar'

function App() {
  

  const[DictionaryValutes, setDictionaryValutes] = useState<ValuteDictionaryData>(DefaultValuteDictionaryData);

  

  useEffect(() => {

    if(DictionaryValutes.DailyUpdate.length == 0 || DictionaryValutes.MountlyUpdate.length == 0){

      
      getValutesDuctionary();
      console.log("Загружена библиотека валют");
    }
    

    
  }, []);


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

  

 const getValutesDuctionary = async () =>{

  const DailyVals = await getDailyValutesData();

  const MonthlyVals = await getMountlyValutesData();

  const newDic : ValuteDictionaryData = {DailyUpdate: DailyVals, MountlyUpdate: MonthlyVals}

  setDictionaryValutes(newDic);

 }

 

  

  return (
    <>

      

      {/* <ValuteDictionaryTabs data={DictionaryValutes}/> */}

      

    {/* <DailyvalutesBar/> */}

      
      {/* <DynamicValutesRatesBar Valutes={DictionaryValutes}/> */}

      <DynamicMetalsBar/>

    
    </>
  )
}



export default App
