var mongojs=require('mongojs');
var users=require('../config/config').db.collection("users");
var communal=require('../public/communal');

//查询所有用户
exports.findAllUsers=function (req,res,next){
	users.find().limit(10).sort({_id:1},function (err,success){
		communal.packData(req,res,err,success);
	});
};

//新增或修改用户
exports.postNewUser=function (req,res,next){
	var user={};
	if(req.params.id!=''){
		user._id=mongojs.ObjectId(req.params.id);
	};
	for(var key in req.params){
		user[key]=req.params[key];
	};
	user.createDate=communal.createNowDate();
	users.save(user,function (err,success) {
		console.log('Response success' + success);
		console.log('Response error' + err);
		if(success){
			res.send(201,user);
			next();
		}
		return next(err);
	})
};

//删除所传过来的用户
exports.deleteUser=function (req,res,next) {
	console.log(req.params);
	var arr=req.params.userId.split(",");
	if(arr[arr.length-1]==''){
		arr.pop();
	};
	console.log(arr);
	var searchArr=[];
	for(var i=0;i<arr.length;i++){
		var obj={};
		console.log(arr[i])
		obj._id=mongojs.ObjectId(arr[i]);
		searchArr.push(obj);
	};
	console.log(searchArr);
	users.remove({$or:searchArr},function (err,success){
		console.log("Response success" + success);
		console.log("Response err" + err);
		if(success){
			res.send(204);
			return next()
		}
		return next(err);
	})
};