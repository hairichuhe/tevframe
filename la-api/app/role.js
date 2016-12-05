
// 假数据，获取所有角色
exports.roleGetAll=function (req,res,next){
	res.send(200,{
  "meta" : {
    "success" : true,
    "code" : 0,
    "message" : "ok"
  },
  "data" : [ {
    "id" : 51,
    "name" : "OPERTOR",
    "description" : "",
    "chineseName" : "操作员"
  }, {
    "id" : 52,
    "name" : "ADMIN",
    "description" : "222222",
    "chineseName" : "超级管理员"
  }, {
    "id" : 53,
    "name" : "COMPTROLLER",
    "description" : "",
    "chineseName" : "审计员"
  }, {
    "id" : 59,
    "name" : "ROLE_YWFACTORY",
    "description" : "",
    "chineseName" : "运维商"
  }, {
    "id" : 63,
    "name" : "ROLE_CUSTOMER",
    "description" : "666",
    "chineseName" : "客户2"
  }, {
    "id" : 65,
    "name" : "demo",
    "description" : "测试",
    "chineseName" : "测试"
  }, {
    "id" : 66,
    "name" : "administrator",
    "description" : "",
    "chineseName" : "456"
  } ]
})
};