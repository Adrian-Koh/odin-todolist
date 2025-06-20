import {isFuture} from "date-fns";

function verifyDate(date) {
    const arr = date.split('-');
    const year = parseInt(arr[0]);
    const month = parseInt(arr[1]);
    const day = parseInt(arr[2]);
    console.log(Date.now());
    
    return isFuture(new Date(year, month-1, day));
}

export {verifyDate};