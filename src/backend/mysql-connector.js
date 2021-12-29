//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'
});

//=======[ Main module code ]==================================================

connection.connect(function(err) {
    if (err) { // If any error occurs, write that error in the console
        console.error('Error while connecting to DB: ' + err.stack);
        return;
    }
    console.log('Connected to DB under thread ID: ' + connection.threadId); // If everything is OK, print that it's connected
});

module.exports = connection;

//=======[ End of file ]=======================================================
