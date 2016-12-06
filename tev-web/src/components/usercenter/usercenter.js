var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)


module.exports = Vue.extend({
    template: __inline('./usercenter.html'),
    el: function() {
        return "#portalAlert";
    },
    data:function(){
        return{
            fullName:'',
            username:'',
            id:'',
            mobile:'',
            email:''
        }
    },
    ready:function(){
        this.get_curr_user();
    },
    components:{

    },

    methods:{
        save:function (){
            var self=this;
            this.$validate(true);
            if(self.$validation.valid){
                var form=$("#save-form");
                var josn=JSON.stringify($('#save-form').serializeObject());
                vueUI.ajaxCall({
                    url:vueUI.conf.host+form.attr('action'),
                    async:false,
                    data:josn,
                    success:function (){
                        vueUI.toolTips("success","保存成功");
                    }
                });
                routers.route.go({ path: '/'})
                         
            }
        },
        get_curr_user:function (){
            var self=this;
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/user/get_curr_user',
                async:false,
                type:"get",  

                success:function (rsp){
                    self.$data=rsp.data;
                }
            })
        },
        reset:function(){
            $("#cons input").val("");
            this.$set("isvalidate",1);
            this.$validate();
        }
    }
});