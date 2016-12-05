var Vue = require('vue');

require('/src/components/widge/vueGrid/vueGrid.js');

window.vueUI=require('vueUI');
module.exports = Vue.extend({
    template: __inline('./actionlog.html'),
    route: {
        canReuse: function() {
          
        },
        data: function() {
           
        }
    },
    el: function() {
        return "#logRoot";
    },
    data: function() {
        var pg = [];
        
        return {
        	page:pg,
        	 gridColumns:[
             {name:'modelName',displayName:'模块名'}, 
             {name:'content',displayName:'操作内容'},
             {name:'sourceIp',displayName:'源IP',sortable:false}, 
             {name:'destIp',displayName:'目标IP',sortable:false},
             {name:'createTime',displayName:'时间',sortable:false}, 
             {name:'url',displayName:'url'},
             {name:'result',displayName:'结果',render:'renderResult', sortable:false}
             ] 
              
            
        }
    },
    methods:{
        openSearch:function(){
            $(".table-filterbar:eq(0)").toggle(500);
        },
        search:function (){
        	this.$refs.grid.query();
        },renderResult:function(v){
        	if(v.result==1)
        		return '<span title="成功">成功</span>';
        	else
        		return '<span title="失败">失败</span>';
        }
    }
});