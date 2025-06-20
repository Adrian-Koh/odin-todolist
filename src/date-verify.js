import {isFuture, format} from "date-fns";

function verifyDate(dateString) {
    const date = getDate(dateString);
    return isFuture(date);
}

function formatDate(dateString) {
    const date = getDate(dateString);
    return format(date, "dd MMM yyyy");
}

function getDate(dateString) {
    const arr = dateString.split('-');
    const year = parseInt(arr[0]);
    const month = parseInt(arr[1]) - 1;
    const day = parseInt(arr[2]);
    return new Date(year, month, day);
}

export {verifyDate, formatDate};