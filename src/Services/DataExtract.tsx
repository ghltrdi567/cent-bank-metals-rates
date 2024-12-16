import { ValuteDictionaryEntity, XmlEntity } from "../Models/ApiEntities";

//возвращаем экземпляр ValuteDictionaryEntity
export function ParseValuteDictionaryEntity(source: XmlEntity){

   if(source.name != "Item") return undefined;

   if(source.attributes["ID"] == null ||source.attributes["ID"] == undefined)  return undefined;

   let objID = source.attributes["ID"];

   console.log(source.attributes["ID"]);

   let objName: string = "";
   let objEngName: string = "";
   let objNominal: string = "";
   let objUSONum: string = "";
   let objUSOChars: string = "";

   

   for (let index = 0; index < source.children.length; index++) {

    console.log(source.children[index]);
    
    if(source.children[index].name == "Name"){ objName = source.children[index].value; }
    if(source.children[index].attributes["EngName"] != null && source.children[index].attributes["EngName"] != undefined){ objEngName = source.children[index].attributes["EngName"]; }
    if(source.children[index].attributes["Nominal"] != null && source.children[index].attributes["Nominal"] != undefined){ objNominal = source.children[index].attributes["Nominal"]; }
    if(source.children[index].attributes["ISO_Num_Code"] != null && source.children[index].attributes["ISO_Num_Code"] != undefined){ objUSONum = source.children[index].attributes["ISO_Num_Code"]; }
    if(source.children[index].attributes["ISO_Char_Code"] != null && source.children[index].attributes["ISO_Char_Code"] != undefined){ objUSOChars = source.children[index].attributes["ISO_Char_Code"]; }
    
   }

   let result: ValuteDictionaryEntity = {ID: objID, Name: objName, EngName: objEngName, Nominal: objNominal, ISO_Num_Code: objUSONum, ISO_Char_Code: objUSOChars}

   return result;


}