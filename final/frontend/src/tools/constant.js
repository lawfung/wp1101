export const resolution_dict = {
    '1 min' : 60, 
    '5 min' : 60 * 5, 
    '15 min' : 60 * 15, 
    '30 min' : 60 * 30, 
    '1 hr' : 60 * 60, 
    '2 hr' : 60 * 60 * 2, 
    '4 hr' : 60 * 60 * 4, 
    '1 day' : 86400
}
export const marksTimes = ['1 min', '5 min', '15 min', '1 hr', '4 hr', '1 day'];
export const TimestampToDate = (timestamp) => {
    var date = new Date(timestamp * 1000);
    var yy = date.getFullYear();
    var mn = ("0" + (date.getMonth() + 1)).substr(-2);
    var dd = ("0" + date.getDate()).substr(-2);
    var hr = ("0" + date.getHours()).substr(-2);
    var mm = ("0" + date.getMinutes()).substr(-2);
    // var ss = date.getSeconds();
    return `${yy}/${mn}/${dd} ${hr}:${mm}`
}
export const nameConvert = (name) =>  ((name.includes('/') || name.includes('-') || name.includes('PERP')) ? name : name + '/USD')