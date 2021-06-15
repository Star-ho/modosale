
const moment = require('moment');
const today = moment().add(1,'day')
while(today.weekday()!=0){
    today.add(1,'day')
}
let start=today.clone()

console.log(start.subtract(7,'day').format("YYYYMMDD"));
console.log(today.format("YYYYMMDD"));

console.log(today.isSameOrAfter(moment()));
