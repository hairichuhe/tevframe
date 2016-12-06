var restify=require('restify');

var User = require('../app/user');
var Role = require('../app/role');
var Customer = require('../app/customer');
var Department = require('../app/department');
var Privilege = require('../app/privilege');

module.exports = function(server) {

    //组件引入
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.CORS())

    // 返回消息头预处理
    server.pre(function(req, res, next){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
        next();
    })

    // 跨域option嗅探处理
    server.opts(/\.*/, function (req, res, next) {
        res.send(200);
        next();
    });

    //user
    server.post({path:'/api/user/query',version:'0.0.1'},User.findAllUsers);
    server.post({path:'/api/user/save',version:'0.0.1'},User.postNewUser);
    server.del({path:'/api/user/:userId',version:'0.0.1'},User.deleteUser);

    //role
    server.get({path:'/api/role/get_all',version:'0.0.1'},Role.roleGetAll);

    //customer
    server.get({path:'/api/customer/get_all',version:'0.0.1'},Customer.cusGetAll);

    //department
    server.get({path:'/api/department/get_non_children/:id',version:'0.0.1'},Department.nonChildrenGetAll);

    //privilege
    server.get({path:'/api/user/get_privileges',version:'0.0.1'},Privilege.getAllPrivilege)
}