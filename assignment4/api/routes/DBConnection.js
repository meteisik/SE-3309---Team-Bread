const mysql=require('mysql');

function newConnection(){
let conn = mysql.createConnection({ 
    host:'localhost',
    user:'root',
    password:'root',
    database:'covid',
    port:3306
});
return conn;
}
module.exports=newConnection;