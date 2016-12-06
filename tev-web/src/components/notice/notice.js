var Vue = require('vue');
require('/src/components/widge/vueGrid/vueGrid.js');
require('/src/components/notice/notice-input.js')
module.exports = Vue.extend({
    template : __inline('./notice.html'),

    el : function() {
        return "#noticeRoot";
    },
    data : function() {
        var pg = [];
        var formId=-1;
        var formTitle=''; 
        var compName=''      
        return {
            page : pg,
            gridColumns : [ 
                {name : 'title',displayName : '公告标题' },
                {name: 'content',displayName: '公告内容',sortable:false },
                {name : 'createDate',displayName : '发布时间' },
                {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',btnCls:'fa fa-edit fa-lg btn',displayName:'编辑',onclick:'goEdit'},
                {type:'btn',headerCls:'juli text-center',headerStyle:'width:50px;',btnCls:'fa fa-remove fa-lg btn',displayName:'删除',onclick:'goDel'}
                
            ],
            formTitle:formTitle,
            formId:formId,        
        }
    },
    ready:function(){
          
    },
    methods : {
        openSearch : function() {
            $(".table-filterbar:eq(0)").toggle(500);
        },
        search : function() {
            this.$refs.grid.query();
        },
        goAdd : function() {  
                     
               $('#noticeDialog').show(); 
               this.$refs.dialog.init(-1);               
        },
        goEdit : function(v) {               
            var nid = null;
            if(null!=v)
                nid=v.id;
            else
                nid = this.$refs.grid.getSelected();
            var self=this; 
                     
            if (null != nid) {
               $('#noticeDialog').show(); 
                this.$refs.dialog.init(nid);
            }              
        },
        goDel : function(v) {
           var ids = null;
            if(null!=v)
                ids = v.id;
            if(null == ids)
                ids = this.$refs.grid.getSelectIds();
                    
            var self=this;
            if(null != ids){
                vueUI.confirm('操作提示', '确定删除？', function() {
                    vueUI.ajaxCall({
                        url : vueUI.conf.host + "/notice/" + ids,
                        async : false,
                        type : "DELETE",
                        success : function() {
                            $("#pageNo").val(1);
                            self.search();
                            vueUI.toolTips('success',"删除成功");
                        } 
                    });
                });
            }
        }         
    }
});