
var mysql = require('mysql');

if (process.env.ENV == 'dev') {
  var Connection = mysql.createConnection({
    host: 'dev01.nidoo.co',
    database: 'msparking',
    user: 'msparking',
    password: 'b5cmm3AF6pgEw6NwD#c8'
  });
}
else if (process.env.ENV == 'prod') {

}
else {
  var Connection = mysql.createConnection({
    host: 'localhost',
    database: 'msparking',
    user: 'node',
    password: 'Acertijo&01',
  });
}

module.exports = Connection;
