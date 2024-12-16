//XML Элемент
export interface XmlEntity{

    name: string;

    attributes: {[id: string]: string};

    children: XmlEntity[];


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


