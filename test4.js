
//const  baemin=require('./baemin.js')
import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'

let data;
(async ()=>{
data={yogiyo:await getDataArray()};
Object.assign(data,{baemin:await getData()})
console.log(data)
})()

