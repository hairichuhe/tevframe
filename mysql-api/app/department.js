
// 假数据，获取所有部门
exports.nonChildrenGetAll=function (req,res,next){
	res.send(200,{
  "meta" : {
    "success" : true,
    "code" : 0,
    "message" : "ok"
  },
  "data" : [ {
    "id" : 27,
    "createUser" : 1,
    "createDate" : "2015-09-15 10:50:30",
    "code" : "depart01",
    "name" : "部门01",
    "description" : ""
  }, {
    "id" : 28,
    "createUser" : 1,
    "createDate" : "2015-09-15 10:50:48",
    "code" : "depart02",
    "name" : "部门02",
    "description" : ""
  }, {
    "id" : 29,
    "createUser" : 1,
    "createDate" : "2015-09-15 10:51:01",
    "code" : "depart03",
    "name" : "部门03",
    "description" : ""
  }, {
    "id" : 30,
    "updateDate" : "2016-03-28 18:33:15",
    "code" : "depart0101",
    "name" : "部门0101",
    "description" : ""
  }, {
    "id" : 31,
    "createUser" : 1,
    "createDate" : "2015-09-15 10:51:46",
    "code" : "depart0201",
    "name" : "部门0201",
    "description" : ""
  }, {
    "id" : 34,
    "updateDate" : "2016-03-28 15:41:52",
    "code" : "444444444444",
    "name" : "4444",
    "description" : ""
  }, {
    "id" : 35,
    "createDate" : "2016-03-28 15:41:38",
    "code" : "444444444444",
    "name" : "4444",
    "description" : ""
  }, {
    "id" : 37,
    "updateUser" : 1,
    "updateDate" : "2016-03-31 13:05:02",
    "code" : "555555555555555555555",
    "name" : "44444455555555555",
    "description" : ""
  }, {
    "id" : 38,
    "createUser" : 1,
    "createDate" : "2016-03-31 13:47:51",
    "code" : "66",
    "name" : "6666",
    "description" : ""
  }, {
    "id" : 39,
    "createDate" : "2016-03-31 13:51:14",
    "updateUser" : 1,
    "updateDate" : "2016-03-31 14:00:28",
    "code" : "depart02",
    "name" : "test02",
    "description" : "测试描述部分"
  }, {
    "id" : 41,
    "createDate" : "2016-03-31 14:23:34",
    "updateUser" : 1,
    "updateDate" : "2016-03-31 14:29:41",
    "code" : "depart06",
    "name" : "test066",
    "description" : "testDESCRIPTION"
  }, {
    "id" : 42,
    "createUser" : 1,
    "createDate" : "2016-03-31 17:12:08",
    "code" : "678",
    "name" : "123",
    "description" : ""
  }, {
    "id" : 43,
    "createUser" : 1,
    "createDate" : "2016-03-31 17:13:36",
    "code" : "456",
    "name" : "45678",
    "description" : ""
  }, {
    "id" : 44,
    "createDate" : "2016-03-31 18:22:13",
    "code" : "depart066",
    "name" : "test066888",
    "description" : "testDESCRIPTION"
  }, {
    "id" : 45,
    "createUser" : 1,
    "createDate" : "2016-03-31 18:23:20",
    "updateUser" : 1,
    "updateDate" : "2016-04-06 14:45:34",
    "code" : "88",
    "name" : "test部门",
    "description" : "测试部门信息666"
  }, {
    "id" : 46,
    "createUser" : 1,
    "createDate" : "2016-04-01 09:30:57",
    "code" : "7",
    "name" : "45",
    "description" : "8"
  }, {
    "id" : 47,
    "createUser" : 1,
    "createDate" : "2016-04-18 14:59:07",
    "code" : "14",
    "name" : "技术部",
    "description" : ""
  } ]
})
};