
//строка вида 1995-12-24
export function ValidateDateString(source: string){


    let partsArray = source.split('-');

    if(partsArray.length !=3) return false;

    const year =  parseInt(partsArray[0]);
    const mo =  parseInt(partsArray[1]);
    const day =  parseInt(partsArray[2]);

    if(year<1990 || year>2100) return false;

    if(mo<0 || mo> 12)  return false;

    if (day<0 || day>31) return false;

   return true;

}

export function ParseDateString(source: string){


   if(ValidateDateString(source)){

    let partsArray = source.split('-');

    const year =  parseInt(partsArray[0]);
    const month =  parseInt(partsArray[1]);
    const day =  parseInt(partsArray[2]);

    return new Date(year, month-1, day);

   }

   

}