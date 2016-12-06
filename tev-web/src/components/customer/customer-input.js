var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)

module.exports = Vue.extend({
    template: __inline('./customer-input.html'),
    el: function() {
        return "#portalDialog";
    },
    data:function(){
        
    },
    ready:function(){
        var self=this;
        var id=$("input[name='id']").val();
        if(id=='-1'||id==''){
            $("input[name='id']").val('');
        }else{
            self.get(id);
        }
        vueUI.inputDialog('#portalDialog');
    },
    route: {         
        canDeactivate: function() {
            this.$parent.search();
        },
    },
    methods:{
       get:function(id){
            var self=this;
            var dt;
            if(id!='-1'){
            	vueUI.ajaxCall({
                    url:vueUI.conf.host+'/customer/'+id,
                    async:false,
                    contentType:'application/json;charset=utf-8',
                    datatype:"json",
                    type:"get",
                    data:'{"pageNo":1,"id":'+id+'}',
                    success:function (rsp){
                        dt=rsp.data;
                    },
                    error:function (rsp){
                        var err=JSON.parse(rsp.responseText);                           
                        vueUI.alert("错误提示","查询失败<br>"+err.meta.message);
                    }
                }) 

                self.$data=dt;

            } else {

                self.$set("id",'')
            }
        },
        save:function (){
            var self=this;
            this.$validate(true);
            if(self.$validation1.valid){               
                var form=$("#saveForm");
                var josn=JSON.stringify($('#saveForm').serializeObject());
                vueUI.ajaxCall({
                    url:vueUI.conf.host+form.attr('action'),
                    async:false,
                    contentType:'application/json;charset=utf-8',
                    datatype:"json",
                    data:josn,
                    type:"post",
                    success:function (){
                        vueUI.toolTips("success","保存成功");
                    },
                    error:function (rsp){
                        var err=JSON.parse(rsp.responseText);
                        vueUI.alert("错误提示","保存失败<br>"+err.meta.message);
                    }
                });
                vueUI.closeDialog('#portalDialog');
                routers.route.go({ path: '/customer'});   
            }
        } 
    }
});