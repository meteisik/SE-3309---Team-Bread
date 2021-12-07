const mysql=require('mysql');

function newConnection(){
let conn = mysql.createConnection({ 
    host:'localhost',
    user:'root',
    password:'rootuser1!',
    database:'covid',
    port:3306
});
return conn;
}
module.exports=newConnection;