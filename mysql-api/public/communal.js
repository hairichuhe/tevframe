'use strict'
module.exports = {
	
	/**
	 * 数据打包 <br>
	 * 参数：req,request  请求对象  response  回复对象   err 数据库查询出错信息  success 数据库查询成功信息
	 */
	packData: function (req,res,data,total){
		var tot;
		var response={meta:{
			success:true,
			message:"ok",
			code:0
		},data:{}};
		var self=this;
		if(total){
			if(total[0]){
				tot=total[0][Object.keys(total[0])]
			};
		};
			
		if(req.route.path.indexOf('/query')==req.route.path.length-6){
			response.data.pageNo=req.params.page_pageNo-0;
			response.data.pageSize=req.params.page_pageSize-0;
			response.data.orderBy=req.params.page_orderBy;
			response.data.order=req.params.page_order;

			response.data.result=data;

			response.data.totalCount=tot;
			response.data.first=1+(response.data.pageNo-1)*(response.data.pageSize);
			response.data.totalPages=Math.ceil(tot/(req.params.page_pageSize-0));
			if(response.data.pageNo<response.data.totalPages){
				response.data.nextPage=response.data.pageNo+1;
				response.data.hasNext=true;
			}else{
				response.data.nextPage=response.data.pageNo;
				response.data.hasNext=false;
			};

			if(response.data.pageNo==1){
				response.data.prePage=1;
				response.data.hasPre=false;
			}else{
				response.data.nextPage=response.data.pageNo-1;
				response.data.hasPre=true;
			};
		}else{
			response.data=data;
		};
			res.send(200,response);
	},

	/**
	 * 根据request 生成query查询语句 <br>
	 * 参数：request.params;
	 */
  	querySql: function (params){
  		var result='';
  		var self=this;
  		if(this.handleParames(params)!=''){
  			result=" WHERE "+this.handleParames(params);
  		};
	  	
	  	

	  	if(params.page_orderBy && params.page_orderBy!=''){
	  		result+=" ORDER BY "+self.reHandleData(params.page_orderBy)+" ";
	  	}else{
	  		result+=" ORDER BY ID "
	  	};

	  	if(params.page_order && params.page_order!=''){
	  		result+=self.reHandleData(params.page_order)+" ";
	  	}else{
	  		result+="ASC "
	  	};

	  	if(params.page_pageNo && params.page_pageNo!=''){
	  		result+="LIMIT "+(params.page_pageNo-1)*(params.page_pageSize-0)+","
	  	}else{
	  		result+="LIMIT 0,"
	  	};

	  	if(params.page_pageSize && params.page_pageSize!=''){
	  		result+=params.page_pageSize;
	  	}else{
	  		result+="10"
	  	};
	  	return result;
	},

	/**
	 * 根据request 生成count查询语句 <br>
	 * 参数：request.params;
	 */
  	queryCountSql: function (params){
  		var result=this.querySql(params).replace(/LIMIT\b\s+\d+,\d+/g,'');
  		
	  	return result;
	},

	/**
	 * 解析方法 <br>
	 * 参数：params 传递回来的对象  将params的filter字段与值过滤。
	 */
  	handleParames: function (params){
  		var self=this;
 	  	var result='';
		for(let key in params){
			if(key.indexOf("filter")!=-1 && params[key]!=''){
				if(key.indexOf("LIKES")!=-1){
					if(key.indexOf("OR")!=-1){
						let uit=key.match(/([A-Za-z]+(?=_OR)|_OR_([A-Za-z]+))/g);
						for(let k in uit){
							if(k==0 && result==''){
								result+=" ("+self.reHandleData(uit[k].replace(/_OR_/g,''))+" LIKE "+"'%"+params[key]+"%' OR ";
							}else if(k==0 && result!=''){
								result+=" AND ("+self.reHandleData(uit[k].replace(/_OR_/g,''))+" LIKE "+"'%"+params[key]+"%' OR ";
							}else if(k==uit.length-1){
								result+=self.reHandleData(uit[k].replace(/_OR_/g,''))+" LIKE "+"'%"+params[key]+"%')"
							}else{
								result+=self.reHandleData(uit[k].replace(/_OR_/g,''))+" LIKE "+"'%"+params[key]+"%' OR ";
							}
						}
					}else{
						let a=key.replace(/filter_LIKES_/g,'');
						if(result==''){
							result+=" "+self.reHandleData(a)+" LIKE "+"'%"+params[key]+"%' "
						}else{
							result+=" AND "+self.reHandleData(a)+" LIKE "+"'%"+params[key]+"%' "
						}
					}
				}else{
					let a=key.match(/_[A-Za-z](?=:)/g);
					if(result==''){
						result+=" "+self.reHandleData(a[0])+" LIKE "+"'"+params[key]+"' ";
					}else{
						result+=" AND "+self.reHandleData(a[0])+" LIKE "+"'"+params[key]+"' ";
					}
				}
			}
		}
		return result;
	},

	/**
	 * 返回当前时间 <br>
	 * 返回格式为：yyyy-mm-dd hh:mm:ss
	 */
  	createNowDate: function (date){
		var myDate;

		if(date){
			myDate=date;
		}else{
			myDate=new Date();
		}
		var str='';
		str+=myDate.getFullYear()+'-'+(myDate.getMonth()<9?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1))+'-'+(myDate.getDate()<9?("0"+myDate.getDate()):myDate.getDate())+' '+(myDate.getHours()<9?("0"+myDate.getHours()):myDate.getHours())+':'+(myDate.getMinutes()<9?("0"+myDate.getMinutes()):myDate.getMinutes())+':'+(myDate.getSeconds()<9?("0"+myDate.getSeconds()):myDate.getSeconds());
		return str;
	},

	/**
	 * 处理数据库查出来字段大写的问题 <br>
	 * 1.将完整的大写转换为小写  2.将_后面的第一个字母大写并去掉——
	 */
  	handleData: function (data){
  		var nData=[];
  		for(let i=0;i<data.length;i++){
  			var t={};
  			for(let key in data[i]){
  				var newkey='';
  				if(key.indexOf("_")==-1){
  					newkey=key.toLowerCase();
  				}else{
  					newkey=key.toLowerCase().replace(/_[a-z]/g,function(word){
  						return word.substring(1,2).toUpperCase();
  					})
  				};
  				t[newkey]=data[i][key];
  			};
  			nData.push(t);
  		};
		return nData;
	},

	/**
	 * 处理前端传来的json对象 <br>
	 * 1.将小写转换为大写  2.驼峰转为_连接；
	 */
  	reHandleData: function (data){
  		if(data instanceof Object){
  			var t={};
	  		for(let key in data){
				var newkey='';
				if(key.search(/[A-Z]/g)==-1){
					newkey=key.toUpperCase();
				}else{
					newkey=key.replace(/[A-Z]/g,function(word){
						return "_"+word;
					}).toUpperCase();
				};
				t[newkey]=data[key];
			};
			return t;
  		}else if(typeof data=='string'){
  			var t;
  			if(data.search(/[A-Z]/g)==-1){
				t=data.toUpperCase();
			}else{
				t=data.replace(/[A-Z]/g,function(word){
					return "_"+word;
				}).toUpperCase();
			};
			return t;
  		}
	},

	/**
	 * 筛选字段 <br>
	 * 将前台有展示的字段筛选出来
	 */
  	filterData: function (options,data){
  		if(data instanceof Array){
  			var nData=[];
	  		for(var i=0;i<data.length;i++){
	  			var obj={};
	  			for(let key in data[i]){
	  				for(let t in options){
	  					if(options[t]==key){
	  						if(data[i][key] instanceof Date){
	  							obj[key]=this.createNowDate(data[i][key]);
	  						}else{
	  							obj[key]=data[i][key];
	  						}
	  					}
	  				}
	  			};
	  			nData.push(obj);
	  		};
			return nData;
  		}else{
  			var obj={};
  			for(let key in data){
  				for(let t in options){
  					if(options[t]==key){
  						if(data[key] instanceof Date){
  							obj[key]=this.createNowDate(data[key]);
  						}else{
  							obj[key]=data[key];
  						}
  					}
  				}
  			};
  			return obj;
  		};
	},

	/**
	 * 打包要传到后台的字段 <br>
	 * 将要传到后台的指分装成json对象便于使用
	 */
  	buildUpdateSql: function (data){
  		data=this.objTrim(data);
  		var str=''
  		for(let key in data){
  			str+=key+'="'+data[key]+'", ';
  		};
  		str=str.substring(0,str.length-2);
  		return str;
	},

	/**
	 * 打包要传到后台的字段 <br>
	 * 将要传到后台的指分装成json对象便于使用
	 */
  	buildInsertData: function (data){
  		var str1='(',str2='values(',result='';
  		var i=0;

  		for(let key in data){
  			if(i==0){
  				str1+=key;
  				if(typeof data[key]=='string'&&data[key]!='default'){
  					str2+='"'+data[key]+'"';
  				}else{
  					str2+=data[key];
  				};
  				i++;
  			}else{
  				str1+=','+key;
  				if(typeof data[key]=='string'&&data[key]!='default'){
  					str2+=',"'+data[key]+'"';
  				}else{
  					str2+=','+data[key];
  				};
  			}
  		};
  		result=str1+') '+str2+')';
  		return result;
	},

	/**
	 * 一对多插入打包sql数据 <br>
	 * target ,给谁打包，arr，一对多中“多”的部分
	 */
  	mulPostPack: function (target,data){
  		var str='("';
  		var ndata;
  		if(typeof str==='string'){
  			ndata=data.split(",");
  		};
  		if(ndata[ndata.length-1]==''){
			ndata.pop();
		};
		for(let k in ndata){
			if(k==ndata.length-1){
				str+=target+'","'+ndata[k]+'")'
			}else{
				str+=target+'","'+ndata[k]+'"),("'
			}
		}
  		return str;
	},

	/**
	 * 去除obj对象的空值 <br>
	 * 把obj中''去掉；
	 */
  	objTrim: function (data){
  		for(let k in data){
  			if(data[k]=='' || data[k]==null){
  				delete data[k];
  			}
  		};
  		return data;
	},

	/**
	 * 创建数组类型的字符串，为sql服务 <br>
	 * 如："(1,2,3)"，为删除服务
	 */
  	buildArrStr: function (data){
  		var str="("
  		for(let k in data){
  			if(k==data.length-1){
  				str+=data[k]+")"
  			}else{
  				str+=data[k]+","
  			}
  		};
  		return str;
	},

	/**
	 * 生成token <br>
	 * 参数：1.token有效时长 单位（秒）类型：数字
	 */
  	createTokenObj: function (expire){
  		var result={
  			access_token:(Math.random()/Date.now()).toString(36).replace(/\d/g,'').slice(1),
  			token_type:"bearer",
  			expires_in:expire
  		};
  		return result;
	}
}