const mysql = require('mysql2')

const connection = mysql.createPool({
    connectionLimit: 2,
    host: 'lrocode.mysql.dbaas.com.br',
    port: '3306',
    database: 'lrocode',
    user: 'lrocode',
    password: 'WTyL8lCfO#'
});

connection.getConnection((err, connection) => {
    if (err) throw err;

    console.log('MySQL conectado com sucesso!')
    connection.release();
});

module.exports = connection;