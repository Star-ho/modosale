let  moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 
let a= moment().format('MMM').toUpperCase()+'_'
console.log(a)