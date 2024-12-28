import { ValuteDictionaryEntity, XmlEntity } from "../Models/ApiEntities";

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