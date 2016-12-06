module.exports = {
	
	/**
	 * 数据打包 <br>
	 * 参数：req,request  请求对象  response  回复对象   err 数据库查询出错信息  success 数据库查询成功信息
	 */
	packData: function (req,res,err,success){
		var response={meta:{},data:{}};
		var self=this;
		if(req.route.path.indexOf('/query')==req.route.path.length-6){
			var t=self.handleParames(req.params);
			for(var i=0;i<success.length;i++){
				success[i].id=success[i]._id;
			};
			for(var i=0;i<t.length;i++){
				if(t[i].name[0]=="page"){
					response.data[t[i].name[1]]=t[i].value;
				}
			};
			response.data.result=success;
			response.data.totalCount;
			response.data.first=1;
			response.data.totalPages=2;
			response.data.orderBySetted=true;
			response.data.hasNext=true;
			response.data.hasPre=false;
			response.data.prePage= 1;
			response.data.nextPage=2;
		}else{
			response.data=success;
		}
		if(success){
			response.meta.success=true;
			response.meta.message='ok';
			response.meta.code=0;
			res.send(200,response);
			return next();
		}else{
			response.meta.success=false;
			response.meta.message=err;
			response.meta.code=err;
			return next(err);
		}
	},

	/**
	 * 解析方法 <br>
	 * 参数：params 传递回来的对象  obj为params处理后承接处理值的对象      此函数将XXX_XXX解析为xxx，xxx
	 */
  	handleParames: function (params){
	  	var result=[];
		for(var key in params){
			var a=[],o={};
			a=key.split("_");
			o.name=a;
			o.value=params[key];
			result.push(o);
		}
		return result;
	},

	/**
	 * 返回当前时间 <br>
	 * 返回格式为：yyyy-mm-dd hh:mm:ss
	 */
  	createNowDate: function (){
		var myDate=new Date();
		var str='';
		str+=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
		return str;
	}
}