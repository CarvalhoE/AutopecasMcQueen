const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'lrocode.mysql.dbaas.com.br',
    port: '3306',
    user: 'lrocode',
    password: 'WTyL8lCfO#',
    database: 'lrocode'
});

module.exports = connection;