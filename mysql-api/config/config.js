var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'demo_la',
  waitForConnections : true,
  port: 3306
});
module.exports={
	db:connection,       									//数据库连接池
	ip_addr:'127.0.0.1',									//监听的ip地址
	port:'80'												//监听ip地址的端口
};