(async ()=>{
    let msg=`select\n네네치킨`
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'root',
    password : process.env.DB_PW||'root',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050
    let connect = await pool.getConnection(conn =>conn)
    const command = msg.split('\n')
    let res=''
    let data=command[1].split(' ')
    for(let i=0;i<data.length;i++){
        let SQLRes = (await connect.query(`select * from data where brand="${data[i]}";`))[0];
        console.log(SQLRes)
        for(let i of SQLRes){
            res+=i.app+' '+i.brand+' '+i.price+'\n'
        }
    }
    console.log(res)
    connect.destroy()
})()