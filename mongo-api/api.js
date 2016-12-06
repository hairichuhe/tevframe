var restify=require('restify');
var config=require('./config/config');
var server=restify.createServer({
	name:'la-frame'
});

//启动路由
require('./route/routes')(server)

//监听端口
server.listen(config.port,config.ip_addr,function (){
	console.log('%s listening at %s',server.name,server.url)
});