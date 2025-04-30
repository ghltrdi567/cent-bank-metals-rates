import axios from 'axios';
import XMLParser from 'react-xml-parser'

export async function FetchXMLDoc(url: string){

    const response = await fetch(url);

       const text = await response.body?.getReader().read().then(function processText({ done, value }) {

       
                let mir= new TextDecoder("windows-1251").decode(value);
    
                let xml : XmlEntity = new XMLParser().parseFromString(mir);

                

                return xml
           

      });
 
      if(text == undefined) return null;
  
       return text;
  


}






//XML Элемент
export interface XmlEntity{

    name: string;

    attributes: {[id: string]: string};

    children: XmlEntity[];

    value: string;


}

// Элемент справочника по валютам
export interface ValuteDictionaryEntity{

    ID: string;

    Name: string;

    EngName: string;

    Nominal: string;

    ISO_Num_Code: string;

    ISO_Char_Code: string;


}

//курс валюты
export interface ValuteRateEntity{

    ID: string;

    NumCode: string;

    CharCode: string;

    Nominal: string;

    Name: string;

    Value: string;

    VunitRate: string;

   
}

//курсы валют на день
export interface ValuteRatesToDateEntity{

    Date: string;

    name: string;

    Valutes: ValuteRateEntity[];
   
}

//курс валюты в день
export interface DynamicValuteRate{

    Date: string;

    Id: string;

    Nominal: string;

    Value: string;

    ValuePUnit: string;


}

/* export interface DynamicValuteRates{

    ID: string;

    DateRange1: string;

    DateRange2: string;

    Rates: DynamicValuteRate[];


} */


export interface DynamicMetalRate{

    Date: string;

    Code: string;

    Buy: string;

    Sell: string;


}

export interface DynamicMetalsratesToDate{

    Date: string;

    Gold: DynamicMetalRate | undefined;

    Silver: DynamicMetalRate | undefined;

    Platinum: DynamicMetalRate | undefined;

    Palladium: DynamicMetalRate | undefined;


}


export interface InvestCoinDictionaryEntity{

    Id: string;
    Releasedate: string;
    Name: string;
    Nominal: string;
    Metall: string;


}

export interface InvestCoinRateToDate{

    CoinId: string;
    Date: string;
    Price: string;
    Metall: string;
    Weight: string;

}



