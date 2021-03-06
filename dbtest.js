//npx babel-node --presets @babel/env dbtest.js
import  { makeDBConnet } from './lib/modusailUtil'

(async ()=>{
    // let data = await connect.query('select * from menu where brandName="멕시카나";');
    // console.log(data[0][0])
    require('dotenv').config();

    // connect.release()
    let dataArray=[]

    var fs = require('fs');
    fs.readFile('textfile/menufile.txt', 'utf8', async function(err, data){
        const {EOL} = require('os');
        data=data.split(EOL).map(v=>v.split('&&'))
        for(let i=0;i<data.length;i++){
            if(data[i][0].indexOf('//')!=-1){
                let temp=data[i][0].split('//')
                data[i][0]=temp[0]
                for(let j=0;j<temp.length;j++){
                    dataArray.push([temp[j],data[i][1],data[i][2]])   
                }
                
            }else{
                dataArray.push([data[i][0],data[i][1],data[i][2]])   
            }
        }
        dataArray.pop()
        let connect = await makeDBConnet()

        for(let i=0;i<dataArray.length;i++){
            let temp = await connect.query(`select brandName from Menu where brandName='${dataArray[i][0]}'`);    
            if(!temp[0][0]){
                await connect.query(`insert into Menu(brandName,imageName,category) values('${dataArray[i][0]}','${dataArray[i][1]}','${dataArray[i][2]}')`);    
                console.log(temp[0][0])
                console.log(dataArray[i][0])
            }
            
            await connect.release();
        }
        connect.destroy()

    })

///기초

// connection.query('insert into Menu(brandName,imageName,category) values(1,1,1)', (error, rows, fields) => {
//   if (error) throw error;
// });
//테이블 생성 구문
//create table data(app varchar(100),brand varchar(100), price varchar(20),img varchar(200), category varchar(20),uri varchar(200), id int(20) auto_increment, primary key(id)  )


// connection.query('create table Menu(brandName varchar(100), imageName varchar(100),category varchar(100));', (error, rows, fields) => {
//     if (error) throw error;
//   });

})()
