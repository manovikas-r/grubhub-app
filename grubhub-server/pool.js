const mysql = require('mysql');
const myPort = process.env.PORT || 3306;
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    port: myPort,
    password: 'password',
    database: 'grubhub'
});

pool.getConnection((err) => {
    if(err){
      throw 'Error occured: ' + err;
    }
    console.log('Database connected');
  });
  
module.exports = pool;