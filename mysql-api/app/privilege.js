
// 假数据，获取所有权限
exports.getAllPrivilege=function (req,res,next){
	res.send(200,{
  "meta" : {
    "success" : true,
    "code" : 0,
    "message" : "ok"
  },
  "data" : [ {
    "id" : 616,
    "code" : "00",
    "name" : "首页",
    "url" : "main",
    "html" : "",
    "ico" : "fa fa-home fa-lg zeta-icon1",
    "type" : 0
  }, {
    "id" : 548091,
    "code" : "80",
    "name" : "公告管理",
    "url" : "",
    "html" : "",
    "ico" : "fa fa-picture-o fa-lg zeta-icon2",
    "type" : 0
  }, {
    "id" : 548104,
    "code" : "8001",
    "name" : "发布公告",
    "url" : "/notice",
    "html" : "",
    "type" : 0,
    "parentId" : 548091
  }, {
    "id" : 548068,
    "code" : "92",
    "name" : "业务模型",
    "url" : "",
    "html" : "",
    "ico" : "fa fa-bar-chart-o fa-lg zeta-icon4",
    "type" : 0
  }, {
    "id" : 548084,
    "code" : "9204",
    "name" : "部门维护",
    "url" : "/department",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548068
  }, {
    "id" : 548090,
    "code" : "9205",
    "name" : "客户维护",
    "url" : "/customer",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548068
  }, {
    "id" : 548057,
    "code" : "99",
    "name" : "系统管理",
    "url" : "",
    "html" : "",
    "ico" : "fa fa-cogs fa-lg zeta-icon1 fa-lg zeta-icon5",
    "type" : 0
  }, {
    "id" : 548062,
    "code" : "9901",
    "name" : "用户管理",
    "url" : "/user",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548057
  }, {
    "id" : 548063,
    "code" : "9902",
    "name" : "权限管理",
    "url" : "/privilege",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548057
  }, {
    "id" : 548064,
    "code" : "9903",
    "name" : "角色管理",
    "url" : "/role",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548057
  }, {
    "id" : 548066,
    "code" : "9904",
    "name" : "数据字典",
    "url" : "/dict",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548057
  }, {
    "id" : 548067,
    "code" : "9905",
    "name" : "日志管理",
    "url" : "/actionlog",
    "html" : "",
    "ico" : "",
    "type" : 0,
    "parentId" : 548057
  } ]
})
};