var mongojs=require('mongojs');
module.exports={
	db:mongojs('127.0.0.1:27017/la-api',['la-api']),       	//数据库地址
	ip_addr:'127.0.0.1',									//监听的ip地址
	port:'80'												//监听ip地址的端口
}