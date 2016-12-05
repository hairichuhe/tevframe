var db=require('../config/config').db;
var communal=require('../public/communal');
var expire;
var fs = require('fs');
var path = require('path');

//查询所有用户
exports.findAllUsers=function (req,res,next){
	db.getConnection(function (err, conn) {
	    if (err) console.log("POOL ==> " + err);

	    conn.query('select * from tb_user '+communal.querySql(req.params),function(err,success){
	        if (err){console.log(err); next(err)};
	        var data=communal.handleData(success);
	       	var options=['id','fullname','username','email','mobile','createdate'];   //前台要显示的字段
	        data=communal.filterData(options,data);

	        conn.query('select COUNT(*) from tb_user '+communal.queryCountSql(req.params),function (err, count) {
	        	if (err) next(err);
			    var total=count;
			    communal.packData(req,res,data,total);
			    conn.release();
			});
	    });
	});
};

//查询指定用户
exports.getNowUser=function (req,res,next){
	if(isNaN(req.params.userId-0)){
		res.send(500,{meta:{code:500,message:"该路由未定义",success:false}})
	};
	
	db.getConnection(function (err, conn) {
	    if (err) console.log("POOL ==> " + err);
	    
	    conn.query('select * from tb_user WHERE ID='+req.params.userId,function(err,success){
	        if (err){console.log(err); next(err)};
	        var data=communal.handleData(success);
	       	var options=['id','fullname','username','enabled','roles','cusId','depId','mobile','email','description'];   //前台要显示的字段
	        data=communal.filterData(options,data);
	        if(data[0].enabled==1){
	        	data[0].enabled=true;
	        }else{
	        	data[0].enabled=false;
	        };
	        res.send(200,{meta:{code:0,success:true,message:'ok'},data:communal.objTrim(data[0])});
	        conn.release();
	    });
	});
};

//查询指定用户角色
exports.getUserRoles=function (req,res,next){
	db.getConnection(function (err, conn) {
	    if (err) console.log("POOL ==> " + err);
	    
	    conn.query('select * from tb_user_role WHERE USER_ID='+req.params.userId,function(err,success){
	    	var str="("
	        if (err){console.log(err); next(err)};
	        var data=communal.handleData(success);
	        data.forEach(function(item,i){
	        	if(i==data.length-1){
	        		str+=item.roleId+")";
	        	}else{
	        		str+=item.roleId+",";
	        	}
	        })

	        conn.query('SELECT * FROM tb_role WHERE ID IN '+str,function(err,success){
	        	if (err){console.log(err); next(err)};

	        	var data=communal.handleData(success);
		        communal.packData(req,res,data);
		        conn.release();
	        })    	
	    });
	});
};

//新增或修改用户
exports.postNewUser=function (req,res,next){
	var data=communal.reHandleData(req.params);
	var options=['USERNAME','PASSWORD','FULLNAME','EMAIL','MOBILE','DEP_ID','CUS_ID','ENABLED'];
		data=communal.filterData(options,data);
		if(data.ENABLED=="false" || data.ENABLED==false){
			data.ENABLED=0;
		}else{
			data.ENABLED=1;
		};
	db.getConnection(function (err, conn) {
		var nowId;
	    if (err) console.log("POOL ==> " + err);
	    if(req.params.id!=''){
	    	nowId=req.params.id;
		    conn.query("update tb_user set "+communal.buildUpdateSql(data)+" where ID="+req.params.id,function (err, success) {
			    if (err) {console.log("更新有错误");console.log("errorInfor："+err);res.send(500)};
			    conn.query('delete from tb_user_role where USER_ID='+nowId, function (err0, success) {
				    if (err0) console.log("删除有错误:"+err0);
				    conn.query('insert into tb_user_role(USER_ID,ROLE_ID) values'+communal.mulPostPack(nowId,req.params.roles),function (err, success) {
					    if (err) {console.log(err);console.log("插入有错误");res.send(500);}else{
					    	res.send(200,{meta:{
					    		success:true,
					    		code:0,
					    		message:"ok"
					    	}});
					    	conn.release();
					    };
					});         
				});
			});
	    }else{
	    	data=communal.objTrim(data);
	    	data.ID='default';
	    	conn.query('insert into tb_user'+communal.buildInsertData(data),function (err, success) {
			    if (err) {console.log("新增有错误");console.log("errorInfor："+err);res.send(500)}else{
			    	nowId=success.insertId;
			    };
			    conn.query('delete from tb_user_role where USER_ID='+nowId, function (err0, success) {
				    if (err0) console.log("删除有错误:"+err0);
				    conn.query('insert into tb_user_role(USER_ID,ROLE_ID) values'+communal.mulPostPack(nowId,req.params.roles),function (err, success) {
					    if (err) {console.log(err);console.log("插入有错误");res.send(500);}else{
					    	res.send(200,{meta:{
					    		success:true,
					    		code:0,
					    		message:"ok"
					    	}});
					    	conn.release();
					    };
					});         
				});
			});
	    };
	});
};

//删除所传过来的用户
exports.deleteUser=function (req,res,next) {
	var arr=req.params.userId.split(",");
	if(arr[arr.length-1]==''){
		arr.pop();
	};
	db.getConnection(function (err, conn) {
	    if (err) console.log("POOL ==> " + err);
	    conn.query('DELETE FROM tb_user WHERE ID IN'+communal.buildArrStr(arr),function(err,success){
	        if (err){ next(err)}else{
	        	conn.query('DELETE FROM tb_user_role WHERE USER_ID IN'+communal.buildArrStr(arr),function (err, success) {
				    if (err) {console.log(err);console.log("删除有错误");res.send(500);}else{
				    	res.send(201,{"meta" : {
						    "success" : true,
						    "code" : 0,
						    "message" : "ok"
						}});
				    	conn.release();
				    };
				});
        	};
	    });
	});	
};

//注册token
exports.getToken=function(req,res,next){
	db.getConnection(function(err,conn){
		if (err) console.log("POOL ==> " + err);
		conn.query('SELECT * FROM tb_user WHERE USERNAME='+'"'+req.params.username+'"',function(err,success){
	        if (err){ next(err)}else{
	        	if(success[0].PASSWORD==req.params.password){
	        		if(req.params.client_id=="clientapp" && req.params.client_secret=="123456"){
	        			var data=communal.createTokenObj(3600);
	        			global.access_token=data.access_token;
	        			clearTimeout(expire);
	        			expire=setTimeout(function(){
	        				global.access_token=null;
	        			},data.expires_in*1000);
	        			res.send(200,data);
	        		}else{
	        			res.send(401,{meta:{
	        				code:401,
	        				success:false,
	        				message:"您没有得到授权，请联系管理员取得授权"
	        			}})
	        		}
	        	}else{
	        		res.send(400,{meta:{
	        			code:400,
	        			success:false,
	        			message:"账号或密码错误"
	        		}})
	        	};
        	};
	        conn.release();
	    });
	});
};

//验证token
exports.testToken=function(req,res,next){
	if(req.url=='/oauth/token' && req.method=="POST"){
		return next();
	}else{
		var authorization=req.headers.authorization.replace(/Bearer\s/g,'');
		if(authorization==global.access_token){
			return next()
		}else{
			res.send(401,{meta:{
				code:401,
				success:false,
				message:"您没有得到授权，请联系管理员取得授权"
			}})
		}
	}
};

//销毁token
exports.revokeToken=function(req,res,next){
	global.access_token=null;
	res.send(200,{meta:{code:0,message:'OK',success:true}});
};

//test
exports.test=function(req,res,next){
	var posterData = req.files.file
	console.log(111);
	var filePath = posterData.path
	var originalFilename = posterData.name
	if (originalFilename) {
	    fs.readFile(filePath, function(err, data) {
			var timestamp = Date.now()
			var type = posterData.type.split('/')[1]
			var poster = timestamp + '.' + type
			var newPath = path.join(__dirname, '../', '/temp/' + poster)
			fs.writeFile(newPath, data, function(err) {
				req.poster = poster
				next()
			})
			if(posterData.size > Math.pow(1024,2)){
				res.send(500,{meta:{code:500,message:'文件太大，限制在1m以内',success:false}});
			}else{
				res.send(200,{meta:{code:0,message:'OK',success:true}});
			}
	    })
	}
	  else {
	    next()
	}
};