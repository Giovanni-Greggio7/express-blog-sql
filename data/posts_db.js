const mysql = require("mysql2")
require('dotenv').config();

const oggetto = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};


const connection = mysql.createConnection(oggetto);

connection.connect ((err) => {
    if(err) throw err;
    console.log("connect to MySQL!");
})

module.exports = connection;