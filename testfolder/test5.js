(async()=>{
    var fs = require('fs')
    let itemList=fs.readFileSync('textfile/test1', 'utf8')
    const {EOL} = require('os');
    itemList=itemList.split(EOL).map(v=>v.split('||'))
    let isDuple=itemList.filter(v=>v[2]==123)
    
    if(isDuple.length){
      itemList=itemList.map(v=>{
        console.log(v)
        if(v[2]=='123'){
          console.log('isDuple')
          v=['4124',123,123]
        }
        return v
      })
    }else{
      itemList.push(['test',123,123])
      console.log('notDubple')
    }


    itemList=itemList.map(v=>v.join('||')).join(EOL)
    fs.writeFileSync('textfile/test1', itemList, ()=>null)
})()
