var Vue = require('vue');
window.vueUI=require('vueUI');
var grid = Vue.extend({
	template: __inline('./vueGrid.html'),
	  /**需要展示的字段及page信息，通过<vue-grid columns="columns" page="page">标签传入**/
	  props: {

		  columns: Array,
		  target:String,	//作用域
		  page:Object,
		  classz:String,	//table引用样式 
		  style:String,		//table样式
		  hideCheckbox:Boolean,	//是否隐藏左侧checkbox
		  hidePagebtn:Boolean		//是否隐藏分页栏 ,默认显示*/
		  
	  },
	  ready:function(){	//html加载完成时调用
		this.query();  //初始化数据
	  },
	  data: function () {
	  	var sortOrders = {}
	    this.columns.forEach(function (key) {
	      sortOrders[key.name] = 1
	    })
	    return {
			      sortOrders: sortOrders
			    }
	  },
	  
	  methods: {	//自定义方法

		fillRender:function(){	//用于将展示字段进行自定义渲染 ,如{name:'enable',displayName:'状态',render:'renderEnable'} 会自动调用renderEnable方法进行值的替换

			  var clus = this._data.columns;
			  
			  var dts = [];
			  if(null != this._data.page){
				  
				  dts = this._data.page.result;
				  for(var i =0;i<clus.length;i++){
					  if(null != dts){
						  if(null != clus[i].render){
							 
							  for(var j = 0;j<dts.length;j++){
								  var clu = clus[i].name;
								  dts[j][clu] = this.$parent[clus[i].render](dts[j]);
							  }
						  }
						  if(null != clus[i].renderHeader){
							  clus[i].displayName = this.$parent[clus[i].renderHeader](clus[i].displayName);
							 
						  }
					  }
				  }
				  
				  this._data.page.result = dts;

			  }
		},
		onBtnClick:function(method,v){
			
			this.$parent[method](v);
		},
	    sortBy: function (key) {	//排序方法,点击表格头部时触发
	    	this.sortOrders[key] = this.sortOrders[key] * -1;
	    	var self=this;
	    	if(self._data.target){
	    		var sort = $("#order","#"+self._data.target);
	    		var sortBy = $("#orderBy","#"+self._data.target);
	    	}else{
	    		var sort = $("#order");
	    		var sortBy = $("#orderBy");
	    	}
	    	
	    	if(sortBy.val()==key){
	    		if(sort.val()=="desc" ?  sort.val("asc"):sort.val("desc"));
	    	}else{
	    		sortBy.val(key);
	    	}
	    		this.query();
	    },
	    setPageSize:function(size){
	    	if(null != size && size>0){
	    		var self=this;
		    	if(self._data.target){
		    		$("#pageSize","#"+self._data.target).val(size);
		    	}else{
		    		$("#pageSize").val(size);
		    	}
		    	this.query();
	    	}
	    },
        selectAll:function(){	//全选/反全选
        	var self=this;
	    	if(self._data.target){
	    		var selectall=$("#checkAll","#"+self._data.target).prop("checked");
	            $("input[name='checkbox2']","#"+self._data.target).prop("checked",selectall); 
	            
	    	}else{
	    		var selectall=$("#checkAll").prop("checked");
	            $("input[name='checkbox2']").prop("checked",selectall); 
	    	}
	    	
            
        },getSelected:function(){	//用于返回一条选择记录,0条或多条选中时返回空
        	var target = null;
        	var self=this;
        	if(self._data.target){
        		target = $("input[name='checkbox2']:checked","#"+self._data.target);
        	}else
        		target = $("input[name='checkbox2']:checked");
			if(target.length==1){
				return target[0].value;
			}else if(target.length==0){
				vueUI.alert("操作提示","请选择一条记录");
				return null;
			}else if(target.length>1){
				vueUI.alert("操作提示","只能选择一条记录");
				return null;
			}
		},getSelectIds:function(){ //用于返回多 条选择记录,0条选中时返回空
			
			var target = null;
        	var self=this;
        	if(self._data.target){
        		target = $("input[name='checkbox2']:checked","#"+self._data.target);
        	}else
        		target = $("input[name='checkbox2']:checked");
			
			if(target.length==0){
				vueUI.alert("操作提示","请选择一条记录");
				return null;
			}else {
				var rs = '';
				for(var i =0;i<target.length;i++){
					rs+=target[i].value+',';
				}
				return rs;
			}
		},goFirst:function(){
	    	var pageNo = 1;
            this.query(pageNo);
	    },goPre:function(){
	    	var self=this;
	    	if(self._data.target){
	    		var pageNo = eval($("#pageNo","#"+self._data.target).val())-1;
	    	}else{
	    		var pageNo = eval($("#pageNo").val())-1;
	    	}
	    	
	    	this.query(pageNo);
	    },goNext:function(){
	    	var self=this;
	    	if(self._data.target){
	    		var pageNo = eval($("#pageNo","#"+self._data.target).val())+1;
	    	}else{
	    		var pageNo = eval($("#pageNo").val())+1;
	    	}
	    	this.query(pageNo);
	    },goLast:function(){
	    	var pageNo = this._data.page.totalPages;
	    	this.query(pageNo);
	    },query:function(pageNo){
	    	var self=this;
	    	if(self._data.target){
	    		var form = $("#query-form","#"+self._data.target)
	    		if(null == pageNo)
		    		$("#pageNo","#"+self._data.target).val(1);
		    	else
		    		$("#pageNo","#"+self._data.target).val(pageNo);
	            var josn=JSON.stringify($('#query-form',"#"+self._data.target).serializeObject());
	    	}else{
	    		var form =$("#query-form");
	    		if(null == pageNo)
		    		$("#pageNo").val(1);
		    	else
		    		$("#pageNo").val(pageNo);
	            var josn=JSON.stringify($('#query-form').serializeObject());
	    	}
	    	
	    	var t;
	    	
            
            vueUI.ajaxCall({
            	url:vueUI.conf.host+form.attr("action"),
                async:false,
                contentType:'application/json;charset=utf-8',
                datatype:"json",
                data:josn,
                type:"post",
                success:function (rsp){
                    t=rsp.data;
                },
                error:function (rsp){
                    vueUI.alert("操作提示","查询失败")
                }
            });
            this._data.page = t;
            this.fillRender();
	    }
	  }

});

Vue.component('vue-grid', grid);
