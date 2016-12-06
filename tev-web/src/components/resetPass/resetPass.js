var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)

module.exports = Vue.extend({
    template: __inline('./resetPass.html'),
    el: function() {
        return "#portalAlert";
    },
    data:function(){
        return{
            id:'',
            password_old:'',
            password_new:''
        }
    },
    methods:{
        save:function (){
            this.$validate(true);
            var self=this;
            if(self.$validation.valid){
                if($("input[name='password_new']").val()==$("#confirmPass").val()){
                    var form=$("#save-form");
                    var josn=JSON.stringify($('#save-form').serializeObject());
                    vueUI.ajaxCall({
                        url:vueUI.conf.host+form.attr('action'),
                        async:false,
                        data:josn,
                        success:function (){
                            vueUI.toolTips("success","保存成功");
                            window.location.href='/components/login/login.html';
                        }
                    });
                }else{
                    vueUI.alert("错误提示","两次输入密码不一致");
                } 
                         
            }
        },
        reset:function(){
            $("#cons input").val("");
            this.$set("isvalidate",1);
            this.$validate();
        }
    }
});