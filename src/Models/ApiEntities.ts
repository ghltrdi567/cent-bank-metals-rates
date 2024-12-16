import XMLParser from 'react-xml-parser'

export async function FetchXMLDoc(url: string){

    const response = await fetch(url);
    
      const text = await response.body?.getReader().read().then(function processText({ done, value }) {

        //console.log(value);
  
            //if(done){
                let mir= new TextDecoder("windows-1251").decode(value);
    
                let xml : XmlEntity = new XMLParser().parseFromString(mir);

                console.log(mir);

                return xml
            //}
            return null;

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


