var Vue = require('vue');
require('/src/components/widge/vueGrid/vueGrid.js');
window.onchangeEnable=function(value){
	$("#enabled").val(value);
	$("#submitQuery").click();
	
}
module.exports = Vue.extend({
    template: __inline('./dict.html'),
    el: function() {
        return "#dictRoot";
    },
    data: function() {
        var pg = [];
        
        return {
        	page:pg,
        	hideCheckbox:false,
        	hidePagebtn:false,
        	gridColumns:[
             {name:'keycode',displayName:'键'}, 
             {name:'value',displayName:'值' ,sortable:false},
             {name:'enable',displayName:'状态',render:'renderEnable',renderHeader:'renderEableHeader',sortable:false}, 
             {name:'type',displayName:'类型'},
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
        	routers.route.go({ path: '/dict/edit/'+'-1', replace: false , params: { id: '-1' }}) 
		},goEdit:function(v){
			
			var nid = null;
			if(null!=v)
				nid=v.id;
			else
				nid = this.$refs.grid.getSelected();
			var self=this;
			if(null != nid){
				routers.route.go({ path: '/dict/edit/'+nid, params: { id: nid }})
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
						url:vueUI.conf.host+"/dict/"+ids,
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
        	if(v.enable)
        		return '<div title="可用">可用</div>';
        	else
        		return '<div title="不可用">不可用</div>';
        },renderEableHeader:function(displayName){
        	return '<select class="xiala2" title="状态" onchange="onchangeEnable(this.value);" name="enable">'+
            '<option value="">状态</option>'+
            '<option value="1">可用</option>'+
            '<option value="0">不可用</option>'+
          '</select>';
        }
    }
});