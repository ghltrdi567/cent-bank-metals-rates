import { ValuteDictionaryEntity, ValuteRateEntity, XmlEntity, DynamicValuteRate, DynamicMetalRate } from "../Models/ApiEntities";

//возвращаем экземпляр ValuteDictionaryEntity
export function ParseValuteDictionaryEntity(source: XmlEntity){

    //console.log(source);

   if(source.name != "Item") return undefined;

   if(source.attributes["ID"] == null ||source.attributes["ID"] == undefined)  return undefined;

   let objID = source.attributes["ID"];

   //console.log(source.attributes["ID"]);

   let objName: string = "";
   let objEngName: string = "";
   let objNominal: string = "";
   let objUSONum: string = "";
   let objUSOChars: string = "";

   

   for (let index = 0; index < source.children.length; index++) {

    //console.log(source.children[index]);


    
    if(source.children[index].name == "Name"){ objName = source.children[index].value; }
    if(source.children[index].name == "EngName"){ objEngName = source.children[index].value; }
    if(source.children[index].name == "Nominal"){ objNominal = source.children[index].value; }
    if(source.children[index].name == "ISO_Num_Code"){ objUSONum = source.children[index].value; }
    if(source.children[index].name == "ISO_Char_Code"){ objUSOChars = source.children[index].value; }
    
   }

   let result: ValuteDictionaryEntity = {ID: objID, Name: objName, EngName: objEngName, Nominal: objNominal, ISO_Num_Code: objUSONum, ISO_Char_Code: objUSOChars}

   return result;


}


export function ParseValuteRateEntity(source: XmlEntity){

    //console.log(source);

   if(source.name != "Valute") return undefined;

   if(source.attributes["ID"] == null ||source.attributes["ID"] == undefined)  return undefined;

   let objID = source.attributes["ID"];

   //console.log(source.attributes["ID"]);

   let numCode: string = "";
   let charCode: string = "";
   let nominal: string = "";
   let name: string = "";
   let value: string = "";
   let valueNunit: string = "";

   

   for (let index = 0; index < source.children.length; index++) {

    //console.log(source.children[index]);


    
    if(source.children[index].name == "NumCode"){ numCode = source.children[index].value; }
    if(source.children[index].name == "CharCode"){ charCode = source.children[index].value; }
    if(source.children[index].name == "Nominal"){ nominal = source.children[index].value; }
    if(source.children[index].name == "Name"){ name = source.children[index].value; }
    if(source.children[index].name == "Value"){ value = source.children[index].value; }
    if(source.children[index].name == "VunitRate"){ valueNunit = source.children[index].value; }
    
   }

   let result: ValuteRateEntity = {ID: objID, NumCode:numCode, CharCode: charCode, Nominal: nominal, Name:name, Value: value, VunitRate: valueNunit}

  

   return result;


}


export function ParseDynamicValuteRateEntity(source: XmlEntity){

    //console.log(source);

   if(source.name != "Record") return undefined;

   if(source.attributes["Id"] == null ||source.attributes["Id"] == undefined)  return undefined;

   let objID = source.attributes["ID"];
   let objDate = source.attributes["Date"];

   //console.log(source.attributes["ID"]);

   
   
   let nominal: string = "";
   let value: string = "";
   let valueNunit: string = "";

   

   for (let index = 0; index < source.children.length; index++) {

    //console.log(source.children[index]);


    
    
    if(source.children[index].name == "Nominal"){ nominal = source.children[index].value; }
    if(source.children[index].name == "Value"){ value = source.children[index].value; }
    if(source.children[index].name == "VunitRate"){ valueNunit = source.children[index].value; }
    
   }

   let result: DynamicValuteRate = {Date: objDate, Id: objID, Nominal: nominal, Value: value, ValuePUnit: valueNunit }
  

   return result;


}



export function ParseDynamicMetallRateEntity(source: XmlEntity){

    //console.log(source);

   if(source.name != "Record") return undefined;

   //if(source.attributes["Id"] == null ||source.attributes["Id"] == undefined)  return undefined;

   let objCode = source.attributes["Code"];
   let objDate = source.attributes["Date"];

   //console.log(source.attributes["ID"]);

   
   
   let buy: string = "";
   let sell: string = "";
   

   

   for (let index = 0; index < source.children.length; index++) {

    //console.log(source.children[index]);


    
    
    if(source.children[index].name == "Buy"){ buy = source.children[index].value; }
    if(source.children[index].name == "Sell"){ sell = source.children[index].value; }
   
    
   }

   let result: DynamicMetalRate = {Date: objDate, Code: objCode, Buy: buy, Sell: sell}
  
//console.log(result);
   return result;


}