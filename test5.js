// const { insertAfter } = require('cheerio/lib/api/manipulation');
// var qs = require('querystring');
// console.log('coupangeats://SearchResult?keyword='+qs.escape('매드포갈릭')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('애슐리')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('제일제면소')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('빕스')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('더플레이스')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('피자몰')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('카페리피')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('잠바주스')+'&sourceType=Promotion')
// console.log('coupangeats://SearchResult?keyword='+qs.escape('커피앳웍스')+'&sourceType=Promotion')


let  moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

let date=moment()
if(+date.format('YYYYMMDD')> +'20190430'){
    console.log(date.format('YYYYMMDD'))
}

