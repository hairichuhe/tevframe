var Vue = require('vue');
require('/src/components/notice/notice-info.js')
module.exports = Vue.extend({
    template: __inline('/src/components/index/header.html'),
    ready:function(){
        // this.searchNotice();
        this.fillUser();
    },
    data:function(){
        this.searchNotice();                
        return ;
    },
    methods:{
        searchNotice:function(){ 
            var self=this;
            var noticeReads=[];
            var totalCount=0;
            var liHtml='';
            self.$set('result',noticeReads);     
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/notice_read/query', 
                async:false,
                contentType:'application/json;charset=utf-8',
                datatype:"json",
                type:"post",
                data:
                    '{"pageNo":1,"page_pageSize":10}'
                ,
                success:function (rsp){
                    if(rsp.data.result){
                        noticeReads=rsp.data.result;
                        totalCount=noticeReads.length>0? noticeReads.length:0;
                        var length=noticeReads.length;
                    }                                              
                    self.$set('totalCount',totalCount);
                    self.$set('result',noticeReads);                    
                }                      
            });
        },                                                     
        logout:function (){
            vueUI.ajaxCall({
                beforeSend:function (XHR){
                    XHR.setRequestHeader('Authorization','Bearer '+window.sessionStorage.access_token);////////设置消息头
                },
                url:vueUI.conf.auth_host+"/oauth/token/revoke",
                dataType : 'text',
                data:'client_id='+vueUI.conf.client_id+'&client_secret='+vueUI.conf.client_secret+'&grant_type=password&username='+window.sessionStorage.user_name+'&password='+window.sessionStorage.user_password,
                contentType:'application/x-www-form-urlencoded',
                success:function(){
                    window.sessionStorage.removeItem("user_name");
                    window.sessionStorage.removeItem("user_password");
                    vueUI.gotoLogin();
                    vueUI.toolTips("success","退出成功")
                }
            })

        },
        gotoNotice:function(id){            
            if (null != id) {
                routers.route.go({path : 'notice/info/' + id,params : {id : id}})
            }
        },
        fillUser:function(){
           vueUI.ajaxCall({
                type:"get",
                url:vueUI.conf.host+"/user/get_curr_user",
                success:function(rsp){
                    $("#userName").text(rsp.data.fullName)
                }

            }) 

        },
        goNotice:function(id){
            $('#noticeInfo').show();
            // vueUI.inputDialog('#portalDialog');
            this.$refs.info.get(id);
        },
        setskin:function(e){
            e.stopPropagation();
            $("#demo-set").toggleClass("open");
        }
    }
});