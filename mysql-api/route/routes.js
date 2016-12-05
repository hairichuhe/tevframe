var restify=require('restify');

var User = require('../app/user');
var Dict = require('../app/dict');
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
        res.charSet('utf-8');
        if(req.method=="OPTIONS"){
            return next()
        }else{
            // User.testToken(req, res, next);
            return next()
        }
    });

    // 跨域option嗅探处理
    server.opts(/\.*/, function (req, res, next) {
        res.send(200);
        next();
    });


    //role
    server.get({path:'/api/role/get_all',version:'0.0.1'},Role.roleGetAll);

    //customer
    server.get({path:'/api/customer/get_all',version:'0.0.1'},Customer.cusGetAll);

    //department
    server.get({path:'/api/department/get_non_children/:id',version:'0.0.1'},Department.nonChildrenGetAll);

    //privilege
    server.get({path:'/api/user/get_privileges',version:'0.0.1'},Privilege.getAllPrivilege);

    //user
    server.post({path:'/oauth/token',version:'0.0.1'},User.getToken);
    server.post({path:'/oauth/token/revoke',version:'0.0.1'},User.revokeToken);
    server.get({path:'/api/user/get_roles/:userId',version:'0.0.1'},User.getUserRoles);
    server.post({path:'/api/user/query',version:'0.0.1'},User.findAllUsers);
    server.post({path:'/api/user/save',version:'0.0.1'},User.postNewUser);
    server.del({path:'/api/user/:userId',version:'0.0.1'},User.deleteUser);
    server.get({path:'/api/user/:userId',version:'0.0.1'},User.getNowUser);

    //user
    server.post({path:'/api/dmc/upgrade',version:'0.0.1'},User.test);

    //dict
    server.post({path:'/api/dict/query',version:'0.0.1'},Dict.query);
};
    
