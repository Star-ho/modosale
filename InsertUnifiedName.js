const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : 'starho',
    password : 'starho',
    database : 'menu',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
(async()=> {
    const connect= await pool.getConnection(conn =>conn)
    let fs = require('fs');
    let data=fs.readFileSync('textfile/UnifiedName', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL).map(v=>v.split('//'))
    if(data[data.length-1][0]==''){
        data.pop()
    }
    // console.log(data);

    for(let i=0;i<data.length;i++){
        for(let j=1;j<data[i].length;j++){
            let temp = (await connect.query(`select * from UnifiedName where fakeName='${data[i][j]}'`))[0][0]; 
            if(!temp){
                await connect.query(`insert into UnifiedName(fakeName,realName) values('${data[i][j]}','${data[i][0]}')`);    
                console.log(data[i][j],data[i][0])
            }
        }
    }
    connect.release();
    connect.destroy()
})()
// connection.query('create table UnifiedName(fakeName varchar(100), realName varchar(100));', (error, rows, fields) => {
//     if (error) throw error;
//   });
