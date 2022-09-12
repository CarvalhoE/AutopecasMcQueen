const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'lrocode.mysql.dbaas.com.br',
    port: '3306',
    user: 'lrocode',
    password: 'WTyL8lCfO#',
    database: 'lrocode'
});

connection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Conectado! :)");
    }
});

module.exports = connection;