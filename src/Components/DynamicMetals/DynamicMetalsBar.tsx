import React, { useEffect, useState } from 'react'
import { DynamicMetalRate, FetchXMLDoc, XmlEntity } from '../../Models/ApiEntities';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from '../DatePicker';
import { ParseDateString } from '../../Services/Datavalidation';
import { DynamicMetalsURL } from '../../Services/ApiStrings';
import { ParseDynamicMetallRateEntity } from '../../Services/DataExtract';

type Props = {}

const DynamicMetalsBar = (props: Props) => {

    const [Fromdate, setFromdate] = useState<Date| undefined>(undefined);

    const [Todate, setTodate] = useState<Date| undefined>(undefined);

    const [DynamicMetals, setDynamicMetels] = useState<DynamicMetalRate[]>([]);

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
  
        setDynamicMetels(newRes);
        //console.log(newRes);
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
   
     </Col>


   </Row>

    </Container>
   
       
   </>
  )
}

export default DynamicMetalsBar