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


(async()=> {
    const connect= await pool.getConnection(conn =>conn)
    let i=['7번가']
    let temp = (await connect.query(`select * from UnifiedName where fakeName='${i[0]}'`))[0][0];    
    if(temp){
        i[0]=temp.realName
    }
    console.log(i[0])
    await connect.release();
    connect.destroy()
})()
