export async function wemefReadData(){
    let fs = require('fs');
    let res={}
    let data=fs.readFileSync('textfile/itemlistWemef', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL).map(v=>v.split('||'))
    data.forEach(v=>{
        if(v[2]){
            Object.assign(res,{ [v[0]] :[v[1],v[2]] })    
            return
        }
        Object.assign(res,{ [v[0]] :[v[1]] })    
    });
    return res
}

export async function coupangReadData(){
    let fs = require('fs');
    require('dotenv').config();
    let res=[]
    let data=fs.readFileSync('textfile/itemlistCoupang', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL).map(v=>v.split('||'))
    data.forEach(v=>{
        if(v[2]){
            Object.assign(res,{ [v[0]] :[v[1],v[2]] })    
            return
        }
        Object.assign(res,{ [v[0]] :[v[1]] })    
    });
    return res
}