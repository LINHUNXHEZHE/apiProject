const mysql = require('mysql');

// 创建连接对象
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'my_manage'
})

// 连接数据库
conn.connect((err)=>{
    if(err){ 
		console.log("—— 连接异常 ——"); 
	}else{
		console.log("—— 连接成功 ——"); 
	}
})

// 10分钟
setInterval(function () {
    conn.query('SELECT 1');
}, 100000);

conn.on('error',(err)=>{
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.log('............');
    }
})

module.exports = conn;


