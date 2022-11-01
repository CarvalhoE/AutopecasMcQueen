const mysql = require('mysql2')

//Localhost
const connection = mysql.createPool({
    connectionLimit: 2,
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'projetointerdisciplinar',
    multipleStatements: true
});

connection.getConnection((err, connection) => {
    if (err) throw err;

    console.log('MySQL conectado com sucesso!')
    connection.release();
});

module.exports = connection;