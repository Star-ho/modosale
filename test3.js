let  moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

let date={now:moment() ,end:moment()}

while(date.end.weekday()!=0){
   date.end.add(1,'day')
}

console.log('refresh start! \n time is '+date.now.format())