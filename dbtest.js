const mysql = require('mysql2/promise');
const pool = mysql.createPool({
host     : 'localhost',
port     :  3306,
user     : 'root',
password : 'root',
database : 'menu',
});

(async ()=>{

    let connect= await pool.getConnection(conn =>conn)
    let data = await connect.query('select * from menu where brandName="멕시카나";');
    console.log(data[0][0])
    
    connect.release()
//데이터 넣기
    // await connect.query('create table Menu(brandName varchar(100), imageName varchar(100),category varchar(100),PRIMARY KEY (brandName));');
    // connect.release()

    // var fs = require('fs');
    // fs.readFile('menufile.txt', 'utf8', async function(err, data){
    //     data=data.split('\r\n').map(v=>v.split('&&'))
    //     for(let i=0;i<data.length;i++){
    //         if(data[i][0].indexOf('//')!=-1){
    //             let temp=data[i][0].split('//')
    //             data[i][0]=temp[0]
    //             for(let j=1;j<temp.length;j++){
    //                 data.push([temp[j],data[i][1],data[i][2]])   
    //             }
                
    //         }
    //     }
    //     for(let i=0;i<data.length;i++){
    //         let temp = await connect.query(`insert into Menu(brandName,imageName,category) values('${data[i][0]}','${data[i][1]}','${data[i][2]}')`);    
    //         console.log(temp)
    //         connect.release()
    //     }
    // })






///기초

// connection.query('insert into Test(brandName,imageName,category) values(1,1,1)', (error, rows, fields) => {
//   if (error) throw error;
// });

// connection.query('create table Test(brandName varchar(100), imageName varchar(100),category varchar(100));', (error, rows, fields) => {
//     if (error) throw error;
//   });
    connect.destroy()

})()
