const mysql = require('mysql2');

require('dotenv').config();
console.log(process.env.DATABASE_HOST);
console.log(process.env.DATABASE_USER);
console.log(process.env.DATABASE_PASSWORD);
console.log(process.env.DATABASE_NAME);

const connection = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
})
connection.connect((err => {
    if(err) throw err;
    console.log('MySQL Connected');
}));

exports.dbcon = connection;