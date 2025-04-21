import React, { useEffect, useState } from 'react'
import { ValuteDictionaryData } from '../ValuteDictionary/ValuteDictionaryTabs';
import DatePicker from '../DatePicker';
import { ParseDateString } from '../../Services/Datavalidation';
import Select from '../Select';
import { Col, Container, InputGroup, Row } from 'react-bootstrap';
import { DynamicValuteRate, FetchXMLDoc, XmlEntity } from '../../Models/ApiEntities';
import { DynamicValutesURL } from '../../Services/ApiStrings';
import { ParseDynamicValuteRateEntity, ParseValuteRateEntity } from '../../Services/DataExtract';
import DynamicValutesRatesTable from './DynamicValutesRatesTable';

type Props = {

Valutes: ValuteDictionaryData


}

const DynamicValutesRatesBar = (props: Props) => {

    const [Fromdate, setFromdate] = useState<Date| undefined>(undefined);

    const [Todate, setTodate] = useState<Date| undefined>(undefined);

    const [ValuteID, setValuteID] = useState<string>("");

    const [DynamicValutes, setDynamicValutes] = useState<DynamicValuteRate[]>([])

    useEffect(() => {

     if(Fromdate !=undefined && Todate !=undefined && ValuteID != undefined && ValuteID.length!=0){

      GetDynamicValutes();





     }
  
      
      
     
  
      
    }, [Fromdate, Todate, ValuteID]);


    const FromDateChanged =(source)=>{

      const  currentDate =  ParseDateString(source.target.value);

      if(currentDate != undefined) setFromdate(currentDate);

      //console.log(currentDate);
    }

    const ToDateChanged =(source)=>{

      const  currentDate =  ParseDateString(source.target.value);

      if(currentDate != undefined) setTodate(currentDate);
      //console.log(currentDate);
    }

    const ValuteChoosen =(source)=>{

      //console.log(source.target.value);

      if(source.target.value != undefined){

        const newId = GetValuteIDFromName(props.Valutes, source.target.value)

        if(newId != undefined) setValuteID(newId);

        //console.log(newId);
      } 
    }

    const GetValutesList = (source: ValuteDictionaryData)=>{

      let result : string[] = [];

      for (let index = 0; index < source.DailyUpdate.length; index++) {
        result.push(source.DailyUpdate[index].Name)
        
      }

      for (let index = 0; index < source.DailyUpdate.length; index++) {
        result.push(source.MountlyUpdate[index].Name)
        
      }

      return result

    }

    const GetValuteIDFromName = (source: ValuteDictionaryData, Name: string)=>{

      for (let index = 0; index < source.DailyUpdate.length; index++) {
        if(source.DailyUpdate[index].Name == Name) return source.DailyUpdate[index].ID;
        
      }

      for (let index = 0; index < source.MountlyUpdate.length; index++) {
        if(source.MountlyUpdate[index].Name == Name) return source.MountlyUpdate[index].ID;
        
      }



    }


    const GetDynamicValutes = async ()=>{

      let xml : XmlEntity| null = await FetchXMLDoc(DynamicValutesURL(ValuteID, Fromdate ?? new Date(), Todate?? new Date()));

      
      let newRes: DynamicValuteRate[] = [];

      for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {

        if(xml != null) {
          
        let curr= ParseDynamicValuteRateEntity(xml.children[index]);
  
        
  
        if(curr != undefined) newRes.push(curr);
  
        }
        
      }

      setDynamicValutes(newRes);
      //console.log(newRes);
    }



      return (

        <>

         <Container>

        <Row className='mt-3'>


          <Col sm>
          <DatePicker caption='От' dateChanged={FromDateChanged}/>
          </Col>

         

          <Col sm>
          <DatePicker caption='До' dateChanged={ToDateChanged}/>
          </Col>

        </Row>


        <Row className='mt-3'>

        <Col sm>
        <Select  placeholder='Выберите валюту:' values={GetValutesList(props.Valutes)} Changed={ValuteChoosen}></Select>
          </Col>


        </Row>

        <Row className='mt-3'>

        <Col sm>
        <DynamicValutesRatesTable Rates={DynamicValutes} />
          </Col>


        </Row>

         </Container>
        
            
        </>

      
      )
}

export default DynamicValutesRatesBar