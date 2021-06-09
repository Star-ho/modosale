// import {getDataArray} from './yogiyo' 


// (async ()=>{
//     console.log(1)
//     let date={now:new Date().getTime(),end:new Date("2021-02-20").getTime()}
//     console.log(await getDataArray(date))
// })()

// const Hangul = require('hangul-js');

// let str='http://dhkorea.wpengine.com/wp-content/uploads/2021/05/ohal_m06_02_포장_수정01.png'
// console.log(Hangul.assemble(str.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g)) )
// console.log(1)
// let temp
// let temp1
// try{
//     temp=str.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g).join('')
//     temp1=encodeURIComponent(str.match(/[가-힣]/g).join(''))
// }catch{
//     temp= Hangul.assemble(str.match(/[^0-9a-zA-Z~!@#$%^&*()+|<>?:{}\/.,-]/g))
//     temp1=encodeURIComponent(temp)
// }
// str=str.replace(temp,temp1)
// console.log(str)

// let date={now:new Date().getTime(),end:new Date().getTime()}
// console.log( new Date(date.end).getDay() )
// while(new Date(date.end).getDay()!=1){
//     date.end=date.end+3600000*24
// }
// console.log( new Date(date.end).getDay() )
// if(date.now>date.end){
//     date.end=date.end+3600000*24*7
// }
// console.log( new Date(date.now),new Date(date.end) )
// console.log( 7-(new Date(date.end).getDate()-new Date(date.now).getDate()) )
// console.log( new Date(date.end-3600000*24*6).getFullYear() )
// console.log( ('000'+(new Date(date.end-3600000*24*6).getMonth()+1)).slice(-2) + ('000'+new Date(date.end-3600000*24*6).getDate()).slice(-2) )
// console.log( ('000'+(new Date(date.end).getMonth()+1)).slice(-2) + ('000'+new Date(date.end).getDate()).slice(-2) )
// console.log( new Date(date.end-3600000*24*7) )
// console.log( new Date(date.end-3600000*24*7).getMonth() )
// console.log( new Date().getMonth() )
// console.log(date)

// let str='http://dhkorea.wpengine.com/wp-content/uploads/2021/05/ohal_m06_02_포장_수정01.pngGS더프레시'
// str=str.match(/[ㄱ-ㅎ가-힣0-9a-zA-Z]/ig)
// str.ma
// console.log(str)

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

rule.second = 1; //매 시간 30분 마다 수행 
var j = schedule.scheduleJob(rule, function(){
    asdf()
        });

function asdf(){
    console.log('...'); 

}
