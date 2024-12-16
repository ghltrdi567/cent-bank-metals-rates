import { useState, useEffect } from 'react'
import React from 'react'
//import reactLogo from '/assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import XMLParser from 'react-xml-parser'
import {ValuteDictionaryEntity, XmlEntity} from './Models/ApiEntities'
import ValuteDictionaryTable from './Pages/ValuteDictionary/ValuteDictionaryTable'
import { ParseValuteDictionaryEntity } from './Services/DataExtract'

function App() {
  const [count, setCount] = useState(0)

  

  const[DictionaryValutes, setDictionaryValutes] = useState<ValuteDictionaryEntity[]>([]);

  useEffect(() => {


    if(DictionaryValutes.length ==0){


      getApiData();
    }

    
  }, []);


  const getApiData = async () => {
    const response = await fetch(
      "https://www.cbr.ru/scripts/XML_valFull.asp?d=0"
    ).then((response) => response.text());
  
    let xml : XmlEntity = new XMLParser().parseFromString(response);    // Assume xmlText contains the example XML.
  
    let newRes: ValuteDictionaryEntity[] = [];

    for (let index = 0; index < xml.children.length; index++) {

      let curr= ParseValuteDictionaryEntity(xml.children[index]);

      if(curr != undefined) newRes.push(curr);
      
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
