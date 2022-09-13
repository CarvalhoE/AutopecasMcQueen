const mysql = require('mysql2/promise');

var pool=mysql.createPool({
    host: 'lrocode.mysql.dbaas.com.br',
    port: '3306',
    user: 'lrocode',
    password: 'WTyL8lCfO#',
    database: 'lrocode'
});

module.exports = pool;