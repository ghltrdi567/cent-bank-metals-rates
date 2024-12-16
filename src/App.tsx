import { useState, useEffect } from 'react'
import React from 'react'
//import reactLogo from '/assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import XMLParser from 'react-xml-parser'
import {FetchXMLDoc, ValuteDictionaryEntity, XmlEntity} from './Models/ApiEntities'
import ValuteDictionaryTable from './Pages/ValuteDictionary/ValuteDictionaryTable'
import { ParseValuteDictionaryEntity } from './Services/DataExtract'
import {parseString} from 'xml2js'

function App() {
  const [count, setCount] = useState(0)

  

  const[DictionaryValutes, setDictionaryValutes] = useState<ValuteDictionaryEntity[]>([]);

  useEffect(() => {


    if(DictionaryValutes.length ==0){


      getApiData();
    }

    
  }, []);


  const getApiData = async () => {
   

    let xml : XmlEntity| null = await FetchXMLDoc("https://www.cbr.ru/scripts/XML_valFull.asp?d=0");   // Assume xmlText contains the example XML.

    
 
    let newRes: ValuteDictionaryEntity[] = [];

    for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

      if(xml != null) {let curr= ParseValuteDictionaryEntity(xml.children[index]);

      if(curr != undefined) newRes.push(curr);
      }
      
    }

    setDictionaryValutes(newRes);
  
  };

  return (
    <>

      <ValuteDictionaryTable Values={DictionaryValutes}/>

    
    </>
  )
}



export default App
