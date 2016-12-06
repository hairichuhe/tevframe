var Vue = require('vue');
require('/src/components/widge/vueGrid/vueGrid.js');
window.onchangeEnable=function(value){
    $("#enabled").val(value);
    $("#submitQuery").click();
    
};
window.onchangeType=function(value){
    $("#type").val(value);
    $("#submitQuery").click();
    
}
module.exports = Vue.extend({
    template: __inline('./privilege.html'),

    el: function() {
        return "#privilegeRoot";
    },
    data: function() {
        var pg = [];
        
        return {
        	page:pg,
        	gridColumns:[
             {name:'name',displayName:'名称' }, 
             {name:'type',displayName:'权限类别',render:'renderType',renderHeader:'renderTypeHeader',sortable:false },
             {name:'enabled',displayName:'是否启用',render:'renderEnable',renderHeader:'renderEableHeader',sortable:false }, 
             {name:'createDate',displayName:'创建日期'}, 
             {name:'updateDate',displayName:'最后更新日期'},
             {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',dataStyle:'',btnCls:'fa fa-edit fa-lg btn',displayName:'编辑',onclick:'goEdit'},
             {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',dataStyle:'',btnCls:'fa fa-remove fa-lg btn',displayName:'删除',onclick:'goDel'}
             ]
        	
        }
    },
    ready:function(){
        this.renderType();
    },
    methods:{
        openSearch:function(){
            $(".table-filterbar:eq(0)").toggle(500);
        },
        search:function (){
        	this.$refs.grid.query();
        },goAdd:function(){
        	routers.route.go({ path: '/privilege/edit/'+'-1', params: { id: '-1' }}) 
		},goEdit:function(v){
            
            var nid = null;
            if(null!=v)
                nid=v.id;
            else
                nid = this.$refs.grid.getSelected();
			var self=this;
			if(null != nid){
                
				routers.route.go({ path: '/privilege/edit/'+nid, params: { id: nid }})
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
						url:vueUI.conf.host+"/privilege/"+ids,
						async:false,
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
        	if(v.enabled)
        		return '<span title="可用">可用</span>';
        	else
        		return '<span title="不可用">不可用</span>';
        },renderType:function(res){
        	if(null == res){
        		
        	}else{
        		if(res.type==1)
                    return '<span title="按钮">按钮</span>';
                else if(res.type==0)
                    return '<span title="菜单">菜单</span>';
        	} 
        },renderEableHeader:function(displayName){
            return '<select class="xiala2" title="状态" onchange="onchangeEnable(this.value);" name="enabled">'+
            '<option value="">状态</option>'+
            '<option value="1">可用</option>'+
            '<option value="0">不可用</option>'+
          '</select>';
        },renderTypeHeader:function(displayName){
            return '<select class="xiala2" title="类型" onchange="onchangeType(this.value);" name="enabled">'+
            '<option value="">类型</option>'+
            '<option value="1">按钮</option>'+
            '<option value="0">菜单</option>'+
          '</select>';
        }
    }
});