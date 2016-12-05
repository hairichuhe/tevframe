var Vue = require('vue');
require('/src/components/widge/vueGrid/vueGrid.js');

module.exports = Vue.extend({
    template: __inline('./user.html'),

    el: function() {
        return "#userRoot";
    },
    data: function() {
        var pg = [];
        
        return {
        	page:pg,
        	gridColumns:[
             {name:'fullname',displayName:'姓名'}, 
             {name:'username',displayName:'账号'},
             {name:'email',displayName:'Email'}, 
             {name:'mobile',displayName:'手机号'}, 
             {name:'createdate',displayName:'创建日期'},
             {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',dataStyle:'',btnCls:'fa fa-edit fa-lg btn',displayName:'编辑',onclick:'goEdit'},
             {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',dataStyle:'',btnCls:'fa fa-remove fa-lg btn',displayName:'删除',onclick:'goDel'}
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
        	routers.route.go({ path: '/user/edit/'+'-1', params: { id: '-1' }}) 
		},goEdit:function(v){
            
            var nid = null;
            if(null!=v)
                nid=v.id;
            else
                nid = this.$refs.grid.getSelected();
			var self=this;
			if(null != nid){
                
				routers.route.go({ path: '/user/edit/'+nid, params: { id: nid }})
            }
			
               
		},goDel:function(v){
            
            var ids = null;
            if(null!=v)
                ids = v.id;
            if(null == ids)
                ids = this.$refs.grid.getSelectIds();
			var self=this;
			if(null != ids){
				vueUI.confirm('操作提示','确定删除？',function(){
				
					vueUI.ajaxCall({
						url:vueUI.conf.host+"/user/"+ids,
						async:false,
						contentType:'application/json;charset=utf-8',
						datatype:"json",
						type:"DELETE",
						success:function (){
							$("#pageNo").val(1);
							self.search();
							vueUI.toolTips("success","删除成功");
						}
					});
				});
			}
			
		},renderEnable:function(v){
        	if(v.enable)
        		return '<span title="可用">可用</span>';
        	else
        		return '<span title="不可用">不可用</span>';
        }
    }
});