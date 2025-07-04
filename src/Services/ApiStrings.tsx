
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

export function ValuteRateToDate(type: ValuteType, dat:Date){

    

    var dateStr:string = ControlNumberLendth(dat.getDate().toFixed(0), 2) + "/" + ControlNumberLendth((dat.getMonth()+1).toFixed(0), 2) + "/" + ControlNumberLendth(dat.getFullYear().toFixed(0), 4)

    var typestr =  type == ValuteType.DailyUpdate ? "0": "1";

    return "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" +GetDateString(dat)+"&d=" + typestr

}

export function DynamicValutesURL(id: string, datfrom:Date, datto:Date,){

    
    return "https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=" +GetDateString(datfrom)+"&date_req2=" + GetDateString(datto) + "&VAL_NM_RQ=" + id;

}

export function DynamicMetalsURL(datfrom:Date, datto:Date,){

    
    return "https://www.cbr.ru/scripts/xml_metall.asp?date_req1=" +GetDateString(datfrom)+"&date_req2=" + GetDateString(datto);

}

export function GetDateString(source:Date){
    return ControlNumberLendth(source.getDate().toFixed(0), 2) + "/" + ControlNumberLendth((source.getMonth()+1).toFixed(0), 2) + "/" + ControlNumberLendth(source.getFullYear().toFixed(0), 4);
}

export function ControlNumberLendth(source: string, length: number){

let result: string = source;

while(result.length<length){

    result = "0" + result;
}
return result;

}