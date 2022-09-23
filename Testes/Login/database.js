const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'lrocode.mysql.dbaas.com.br',
    port: '3306',
    database: 'lrocode',
    user: 'lrocode',
    password: 'WTyL8lCfO#'
});

connection.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('MySQL conectado com sucesso!')
    }
})

module.exports = connection;