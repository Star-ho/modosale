//npx babel-node --presets @babel/env index.js >./log/mainLog 2>&1 &
//disown -a
//ssh -i "starho_key.pem" ubuntu@ec2-15-165-75-172.ap-northeast-2.compute.amazonaws.com
/**
 * yogiyo, baemin은 앱에서 받아서 12시에 처리
 * 
 * coupang은 바뀔떄마다 일단 텔레그램이 옴 
 * ++ 각 달의 할인이 있음, 할인이 월단위가 아닌, 주, 보름 단위임
 * ++ 반복적인거는 파일에 기록해놓음, event id 가 같은게 존재하면 자동으로 업데이트
 * ++ 처음들어오는건 수동으로 넣어줘야함
 * 
 * wemef는 거의 주단위임
 * ++특정일 추가 할인이 있는 경우가 있음, 체크해야함
 * 
 * 쿠팡은 거의 watch쪽에서 처리
 * 
 */
//끝
import {insertFunc,deleteFunc,readDBFunc} from './lib/DBHandling'
import {getWemefData} from './lib/imgWemef.js'
import {getCoupangData} from './lib/imgCoupangeats.js'
import {getData} from './lib/baemin.js'
import { telegramSendMessage } from './lib/modusailUtil';

let data={};

async function setYogiyo(){
   await insertFunc('yogiyo')
   readDB()
}


async function setBaemin(){
   await insertFunc('baemin')
   readDB()
}

async function changeWemef(){
   await insertFunc('wemef')
   readDB()
}

async function changeCoupang(){
   await insertFunc('coupang')
   readDB()
}


async function readDB(){
   data = await readDBFunc()
   //console.log(data)
}

//시작 하는곳
let intervalId

readDB()
//위메프오도 추가
async function setyogiyoBaemin(){
   setYogiyo().catch((e)=>{
      console.log(e)
      telegramSendMessage('yogiyo error!')
   })
   setBaemin().catch((e)=>{
      console.log(e)
      telegramSendMessage('baemin error!')
   })
   let data={baemin:[]}
   for(let i of Object.entries(await getData())){
      data.baemin.push(JSON.stringify(i))
   }
   intervalId=setInterval(async()=>await watchBaeminData(data),1000*60*10);
}

async function watchBaeminData(data){
   let baemin=[]
   for(let i of Object.entries(await getData())){
      baemin.push(JSON.stringify(i))
   }
   let flag=true
   for(let i of baemin){
      if(!data.baemin.includes(i)){
         data.baemin=baemin.slice()
         setBaemin()
         flag=false
         break
      }
   }
   if(flag){
      clearInterval(intervalId)
   }
}

var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(express.static('logo'));

app.get('/', function(req, res) {
   if(req.param('ver')=='0.91'||req.param('ver')=='0.90'){
      res.send(JSON.stringify(data));
   }else{
      res.send(JSON.stringify({error:"error"}));
   }
});

app.get('/refresh', function(req, res) {
   setyogiyoBaemin()
   res.send("refresh!");
});

app.get('/chageCoupang', function(req, res) {
   changeCoupang()
   res.send("chageCoupang");
});

app.get('/changeWemef', function(req, res) {
   changeWemef()
   res.send("chageWemef");
});



app.get('/readdb', function(req, res) {
   readDB()
   res.send("readDB!!");
});

app.get('/showimg', async function(req, res) {
   let retval=[]
   retval.push(...await getWemefData(true,true))
   retval.push('line')
   retval.push(...await getCoupangData())
   let html=`
   <html><head></head><body>
   `
   retval.forEach(v=>{
      if(v=='line'){
         html+=`<div style="float: left;margin: 10;width: 100%;" >`   
         html+=`<p></p><p>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p><p></p>`
         html+=`</div>`
         return
      }
      html+=`<div style="float: left;margin: 10;width: 45%;" ><img style="float: left;background-color: blueviolet;" src="${v.img}" width="250" height="100" />`
      html+=`<p>${v.id}</p>`
      html+='</div>\n'
   })
   html+=`</body></html>`
   res.send(html);
});

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

var server = app.listen(3000, function(){
   console.log("Express server has started on port 3000")
})