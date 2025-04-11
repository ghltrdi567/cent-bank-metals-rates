import React, { useState } from 'react'
import DailyValitesTabs, { ValuteRatesToDateData, defautValuteRatesToDateData } from './DailyValitesTabs'
import { Col, Container, Row } from 'react-bootstrap'
import DatePicker from '../DatePicker'
import { ParseDateString } from '../../Services/Datavalidation'
import { FetchXMLDoc, ValuteRateEntity, XmlEntity } from '../../Models/ApiEntities'
import { ValuteRateToDate, ValuteType } from '../../Services/ApiStrings'
import { ParseValuteRateEntity } from '../../Services/DataExtract'

type Props = {

    
}

const DailyvalutesBar = (props: Props) => {

  const[DailyValutes, setDailyValutes] = useState<ValuteRatesToDateData>(defautValuteRatesToDateData);

  const update =(source) =>{

    const ty = source.target.value;
  
     const  currentDate =  ParseDateString(source.target.value);
  
     if(currentDate != undefined) DailyValutedateUpdated(currentDate);
  
    };


    const DailyValutedateUpdated = (date: Date) =>{

    
      getValutesRateToDate(date);
      console.log("Загружены курсы валют на " + date);
  
    }

    const getValutesRateToDate = async (date: Date) =>{

      const DailyVals = await getDailyValutesDataToDay(date);
    
      const MonthlyVals = await getMonthlyValutesDataToDay(date);
    
    
      const newvals : ValuteRatesToDateData = {DailyUpdate: DailyVals, MountlyUpdate: MonthlyVals}
    
      setDailyValutes(newvals);
    
     }


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
  


  return (
    <Container fluid>
    <Row >
      <Col className='mb-4'>
      
      <DatePicker caption='Дата:' dateChanged={update}></DatePicker>
      
      
      </Col>
    </Row>

    <Row>
      <Col>
      
      <DailyValitesTabs data={DailyValutes}/>
      
      
      </Col>
    </Row>
  </Container>
  )
}

export default DailyvalutesBar