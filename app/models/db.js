const mysql = require('mysql');
const dbconfig = require('../config/db.config.js');

//create connection to DB
const connection = mysql.createConnection({
    host: dbconfig.HOST,
    port: dbconfig.PORT,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB
});

//open connection
connection.connect(error =>{
    if(error) throw error;
    console.log("Successfully connected to the Database");
});

module.exports = connection;