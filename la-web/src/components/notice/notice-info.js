var Vue = require('vue');

  // module.exports = Vue.extend({
    Vue.component('notice-info',{ 
    template : __inline('./notice-info.html'),
    el : function() {
        return "#noticeinfoDialog";
    },
    data :function() {

    },
    ready : function() {
       
    },
    methods : {
        get : function(id) {
            var self = this;
            var dt;    
            var ids;
            var createDate='';
            var title='';
            var content='';
            var form = $("#notice-info")
            if (id != '-1') {
                vueUI.ajaxCall({
                    url : vueUI.conf.host + '/notice_read/' + id,                    
                    async : false,
                    type : "get",
                    data : '{"pageNo":1,"id":' + id + '}',                   
                    success : function(rsp) {                        
                         dt = rsp.data;                                                
                    }
                }) 
                self.$set('title',dt.title);
                self.$set('content',dt.content);  
                self.$set('createDate',dt.createDate);                
            }
        }, 
        close:function(){
            // vueUI.closeDialog('#portalDialog');
            $('#noticeInfo').hide(30)
        }      
    }
});