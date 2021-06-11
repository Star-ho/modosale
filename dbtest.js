const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'menu',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

(async ()=>{
    // let data = await connect.query('select * from menu where brandName="멕시카나";');
    // console.log(data[0][0])
    
    // connect.release()
    let dataArray=[]

    var fs = require('fs');
    fs.readFile('menufile.txt', 'utf8', async function(err, data){
        data=data.split(process.env.Linux_CRLF||'\r\n').map(v=>v.split('&&'))
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
        const connect= await pool.getConnection(conn =>conn)

        for(let i=0;i<dataArray.length;i++){
            let temp = await connect.query(`insert into Menu(brandName,imageName,category) values('${dataArray[i][0]}','${dataArray[i][1]}','${dataArray[i][2]}')`);    
            console.log(temp)
            await connect.release();

        }
        connect.destroy()

    })







///기초

// connection.query('insert into Test(brandName,imageName,category) values(1,1,1)', (error, rows, fields) => {
//   if (error) throw error;
// });

// connection.query('create table Test(brandName varchar(100), imageName varchar(100),category varchar(100));', (error, rows, fields) => {
//     if (error) throw error;
//   });
    connect.destroy()

})()
