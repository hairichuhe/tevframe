
// 假数据，获取所有顾客
exports.cusGetAll=function (req,res,next){
	res.send(200,{
  "meta" : {
    "success" : true,
    "code" : 0,
    "message" : "ok"
  },
  "data" : [ {
    "id" : 3,
    "createUser" : 1,
    "createDate" : "2015-09-17 16:42:47",
    "name" : "qqqq",
    "location" : "qqqww",
    "contacts" : "ww",
    "phone" : "021-45678901",
    "email" : "ww"
  }, {
    "id" : 4,
    "createUser" : 1,
    "createDate" : "2015-09-22 10:13:13",
    "name" : "1111",
    "location" : "1111",
    "contacts" : "",
    "phone" : "021-63011115",
    "email" : ""
  }, {
    "id" : 5,
    "createDate" : "2016-03-28 10:50:28",
    "name" : "test2",
    "location" : "qqqww",
    "contacts" : "ww",
    "phone" : "021-45678901",
    "email" : "ww"
  }, {
    "id" : 7,
    "createDate" : "2016-03-28 11:25:56",
    "name" : "test66",
    "location" : "qqqww",
    "contacts" : "ww",
    "phone" : "021-45678901",
    "email" : "ww"
  }, {
    "id" : 11,
    "createDate" : "2016-03-28 14:59:30",
    "name" : "测试客户55",
    "location" : "qqqww",
    "contacts" : "ww",
    "phone" : "021-45678901",
    "email" : "ww"
  }, {
    "id" : 14,
    "createUser" : 1,
    "createDate" : "2016-03-31 13:47:21",
    "updateUser" : 1,
    "updateDate" : "2016-04-01 09:31:38",
    "name" : "66666666",
    "location" : "",
    "contacts" : "66",
    "phone" : "13012345678",
    "email" : ""
  }, {
    "id" : 15,
    "createDate" : "2016-03-31 14:21:24",
    "updateUser" : 1,
    "updateDate" : "2016-04-06 14:11:34",
    "name" : "test666",
    "location" : "qqqww",
    "contacts" : "ww",
    "phone" : "021-45678901",
    "email" : "72476988@qq.com"
  } ]
})
};