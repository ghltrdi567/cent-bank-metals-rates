import React, { useEffect, useState } from 'react'
import { DynamicMetalRate, DynamicMetalsratesToDate, FetchXMLDoc, XmlEntity } from '../../Models/ApiEntities';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from '../DatePicker';
import { ParseDateString } from '../../Services/Datavalidation';
import { DynamicMetalsURL } from '../../Services/ApiStrings';
import { ParseDynamicMetallRateEntity } from '../../Services/DataExtract';
import CheckBoxDynamicCaption from '../CheckBoxDynamicCaption';
import DynamicMetalsTable from './DynamicMetalsTable';

type Props = {}

const DynamicMetalsBar = (props: Props) => {

    const [Fromdate, setFromdate] = useState<Date| undefined>(undefined);

    const [Todate, setTodate] = useState<Date| undefined>(undefined);

    const [DynamicMetals, setDynamicMetels] = useState<DynamicMetalsratesToDate[]>([]);

    useEffect(() => {

        if(Fromdate !=undefined && Todate !=undefined){
   
            GetDynamicValutes();
   
   
        }
     
         
       }, [Fromdate, Todate]
    );

    const GetDynamicValutes = async ()=>{

        let xml : XmlEntity| null = await FetchXMLDoc(DynamicMetalsURL(Fromdate ?? new Date(), Todate?? new Date()));
  
        
        let newRes: DynamicMetalRate[] = [];
  
        for (let index = 0; index < (xml?.children.length == undefined?0 :xml?.children.length); index++) {
  
          if(xml != null) {
            
          let curr= ParseDynamicMetallRateEntity(xml.children[index]);
    
          
    
          if(curr != undefined) newRes.push(curr);
    
          }
          
        }
  
        
        let allMetals: DynamicMetalsratesToDate[] = [];

        for (let index = 0; index < newRes.length; index++) {
          
          let gold: DynamicMetalRate|undefined = undefined;
          let silver: DynamicMetalRate|undefined = undefined;
          let platimun: DynamicMetalRate|undefined = undefined;
          let palladium: DynamicMetalRate|undefined = undefined;

          const first = newRes[index];

          const Data = newRes[index].Date;

          if(first.Code == "1") gold = newRes[index];
          if(first.Code == "2") silver = newRes[index];
          if(first.Code == "3") platimun = newRes[index];
          if(first.Code == "4") palladium = newRes[index];

          index++;

          if(index>newRes.length-1) break;

          const second = newRes[index];

          if(second.Date !=Data){
            index--;
            allMetals.push({Date:Data,  Gold: gold, Silver: silver, Platinum: platimun, Palladium: palladium});

            continue;
          }

          if(second.Code == "1") gold = newRes[index];
          if(second.Code == "2") silver = newRes[index];
          if(second.Code == "3") platimun = newRes[index];
          if(second.Code == "4") palladium = newRes[index];

          index++;

          if(index>newRes.length-1) break;

          const third = newRes[index];

          if(third.Date !=Data){
            index--;
            allMetals.push({Date:Data,  Gold: gold, Silver: silver, Platinum: platimun, Palladium: palladium});
            continue;
          }

          if(third.Code == "1") gold = newRes[index];
          if(third.Code == "2") silver = newRes[index];
          if(third.Code == "3") platimun = newRes[index];
          if(third.Code == "4") palladium = newRes[index];

          index++;

          if(index>newRes.length-1) break;

          const fouth = newRes[index];

          if(fouth.Date !=Data){
            index--;
            allMetals.push({Date:Data,  Gold: gold, Silver: silver, Platinum: platimun, Palladium: palladium});
            continue;
          }


          if(fouth.Code == "1") gold = newRes[index];
          if(fouth.Code == "2") silver = newRes[index];
          if(fouth.Code == "3") platimun = newRes[index];
          if(fouth.Code == "4") palladium = newRes[index];


          allMetals.push({Date:Data,  Gold: gold, Silver: silver, Platinum: platimun, Palladium: palladium});

        }

        setDynamicMetels(allMetals);
      }



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
   <DynamicMetalsTable Metals={DynamicMetals}/>
     </Col>


   </Row>

    </Container>
   
       
   </>
  )
}

export default DynamicMetalsBar