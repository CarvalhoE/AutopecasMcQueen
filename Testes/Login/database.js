async function connect() {
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const mysql = require('mysql2/promise');

    const connection = mysql.createPool({
        host: 'lrocode.mysql.dbaas.com.br',
        port: '3306',
        user: 'lrocode',
        password: 'WTyL8lCfO#',
        database: 'lrocode'
    });

    global.connection = connection;
    return connection;
}

module.exports = connect;