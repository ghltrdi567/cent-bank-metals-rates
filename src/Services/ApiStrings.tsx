
//Тпи валюты по частоте установления курса
export enum ValuteType{

    //Курс устанавливается ежедневно
    DailyUpdate,
    //Курс устанавливается ежемесячно
    MounthUpdate

}

//Возвращает строку запроса справочника по валюткам
export function ValuteDictionary(type: ValuteType){

    var typestr =  type == ValuteType.DailyUpdate ? "0": "1";

    return "http://www.cbr.ru/scripts/XML_val.asp?d=" + typestr

}


//Возвращает строку запроса полного справочника по валюткам (с ISO - кодами)
export function ValuteFullDictionary(type: ValuteType){

    var typestr =  type == ValuteType.DailyUpdate ? "0": "1";

    return "http://www.cbr.ru/scripts/XML_valFull.asp?d=" + typestr

}