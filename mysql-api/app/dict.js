var db=require('../config/config').db;
var communal=require('../public/communal');
var expire;
var fs = require('fs');
var path = require('path');

//查询所有用户
exports.query=function (req,res,next){
	db.getConnection(function (err, conn) {
	    if (err) console.log("POOL ==> " + err);

	    conn.query('select * from tb_user '+communal.querySql(req.params),function(err,success){
	        if (err){console.log(err); next(err)};
	        var data=communal.handleData(success);
	       	var options=['id','keycode','value','type','enable'];   //前台要显示的字段
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