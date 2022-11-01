const mysql = require('mysql2')

//servidor Hospedado
const connection = mysql.createPool({
    connectionLimit: 2,
    host: 'lrocode.mysql.dbaas.com.br',
    port: '3306',
    database: 'lrocode',
    user: 'lrocode',
    password: 'WTyL8lCfO#',
    multipleStatements: true
});

//Localhost
const connectionLocal = mysql.createPool({
    connectionLimit: 2,
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'autopecas',
    multipleStatements: true
});

connectionLocal.getConnection((err, connection) => {
    if (err) throw err;

    console.log('MySQL conectado com sucesso!')
    connection.release();
});

module.exports = connectionLocal;