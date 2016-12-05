var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : '192.168.0.186',
  user     : 'root',
  password : 'root',
  database : 'demo_la',
  port:3306
});
db.connect();
// db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });
//var insertSQL = 'insert into tb_user(ID,USERNAME,PASSWORD) values(default,"conan","fdfds")';
var insertSQL = 'insert into tb_user(ID,USERNAME,PASSWORD) values(default,"52","52")';
var selectSQL = 'select * from tb_user limit 10';
var deleteSQL = 'delete from tb_user where ID=5590';
var updateSQL = 'update tb_user set FULLNAME="ddd", USERNAME="ddd", CUS_ID="", DEP_ID="", MOBILE="", EMAIL="", where ID=533';
// var updateSQL = 'update tb_user set FULLNAME="ddd" USERNAME="ddd" where ID=552';

// //delete
db.query(deleteSQL, function (err0, res0) {
    if (err0) console.log(err0);
    console.log("DELETE Return ==> ");
    console.log(res0);               
});

// //insert
// db.query(insertSQL, function (err1, res1) {
//     if (err1) console.log(err1);
//     console.log("INSERT Return ==> ");
//     console.log(res1);
// });

// //query
// db.query(selectSQL, function (err2, rows) {
//     if (err2) console.log(err2);

//     console.log("SELECT ==> ");
//     for (var i in rows) {
//         console.log(rows[i]);
//     }
// });

//update
// db.query(updateSQL, function (err3, res3) {
//     if (err3) console.log(err3);
//     console.log("UPDATE Return ==> ");
//     console.log(res3);
// });

//query
// db.query(selectSQL, function (err4, rows2) {
//     if (err4) console.log(err4);

//     console.log("SELECT ==> ");
//     console.info(rows2);
//     // for (var i in rows2) {
//     //     console.log(rows2[i]);
//     // }
// });

db.end();