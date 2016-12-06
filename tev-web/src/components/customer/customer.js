var Vue = require('vue');
require('/src/components/widge/vueGrid/vueGrid.js');

module.exports = Vue.extend({
    template: __inline('./customer.html'),
    el: function() {
        return "#customRoot";
    },
    data: function() {
        var pg = [];
        
        return {
        	page:pg,
        	gridColumns:[ 
             {name:'name',displayName:'客户名称'},
             {name:'contacts',displayName:'联系人'},
             {name:'phone',displayName:'电话'}, 
             {name:'email',displayName:'Email'},  
             {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',btnCls:'fa fa-edit fa-lg btn',displayName:'编辑',onclick:'goEdit'},
             {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',btnCls:'fa fa-remove fa-lg btn',displayName:'删除',onclick:'goDel'} 
             ]       	
        }
    },
    methods:{
        openSearch:function(){
            $(".table-filterbar:eq(0)").toggle(500);
        },
        search:function (){
        	this.$refs.grid.query();
        },goAdd:function(){
        	routers.route.go({ path: '/customer/edit/'+'-1',params: { id: '-1' }}) 
		},goEdit:function(v){
			var nid = null;
			if(null!=v)
				nid=v.id;
			else
				nid = this.$refs.grid.getSelected();
			var self=this;
			if(null != nid){
				routers.route.go({ path: '/customer/edit/'+nid, params: { id: nid }})
            }
			 
		},
		goDel:function(v){
			var ids = null;
			if(null!=v)
				ids = v.id;
			if(null == ids)
				ids = this.$refs.grid.getSelectIds();			
			var self=this;
			if(null != ids){
				vueUI.confirm('操作提示','确定删除？',function(){				
					vueUI.ajaxCall({
						url:vueUI.conf.host+"/customer/"+ids,
						async:false,
						contentType:'application/json;charset=utf-8',
						datatype:"json",
						type:"DELETE",
						success:function (){
							$("#pageNo").val(1);
							self.search();							 
							vueUI.toolTips("success","删除成功");
						},
						error:function (rsp){
						 	var err=JSON.parse(rsp.responseText);						 
							vueUI.alert("错误提示","删除失败<br>"+err.meta.message);
						}
					});
				});
			}			
		} 
	}
});