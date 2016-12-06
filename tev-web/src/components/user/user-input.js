var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)
var select = require('vue-strap').select;
var option = require('vue-strap').option;

module.exports = Vue.extend({
    template: __inline('./user-input.html'),
    el: function() {
        return "#portalDialog";
    },
    data:function(){
        return{
            fullname:'',
            confirm_password:'',
            customs:'',
            username:'',
            password:'',
            confirm_password:'',
            rolesSelect:'',
            customsSelect:'',
            departments:'',
            roles:'',
            departmentsSelect:'',
            mobile:'',
            email:''
        }
    },
    ready:function(){
        //vueUI.bindEvent("portalDialog");
        // console.log($("input[type='checkbox']").prop("checked"))
        //var target=$("input[type='checkbox']");
        // for(var i=0;i<target.length;i++){
        //     console.log($(target[i]).prop("checked"))
        //     if($(target[i]).prop("checked")){
        //         $(target[i]).parent("label").addClass('active')
        //     }
        // }
        // if($("input[type='checkbox']").prop("checked")){
        //     console.log(21);
        //     $("input[type='checkbox']").parent("label").addClass("active");
        // }
        var self=this;
        var id=$("input[name='id']").val();
        if(id=='-1'){
            $("input[name='id']").val('')
            self.role_get_all()
            self.custom_get_all()
            self.department_get_all()
        }else{;
            self.get(id)
            self.role_get(id)
            self.role_get_all()
            self.custom_get_all()
            self.department_get_all()
        };
        vueUI.inputDialog("#portalDialog");
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
          var arr=[];
          var form=$("#save-form")
          if(id!='-1'){
              vueUI.ajaxCall({
                url:vueUI.conf.host+'/user/'+id,
                async:false,
                type:"get",
                data:
                    '{"pageNo":1,"id":'+id+'}'
                ,
                success:function (rsp){
                    dt=rsp.data;
                    self.$data=dt;
                    if(dt.cusId==null){
                        self.$set("customsSelect",'')
                    }else{
                        self.$set("customsSelect",dt.cusId)
                    }
                    if(dt.depId==null){
                        self.$set("departmentsSelect",'')
                    }else{
                        self.$set("departmentsSelect",dt.depId)
                    }
                }
            }) 
           
          }else{self.$set("id",'')}
        },
        save:function (){
            var self=this;
            this.$validate(true);
            if($("input[name='roles']").val()!=''){
                self.$validation.roleselect.valid=true;
            }else{
                self.$validation.roleselect.valid=false;
            }
            if(self.$validation.valid){
                if($("input[name='password']").val()==$("#confirm_password").val()){
                    vueUI.closeDialog('#portalDialog');
                    
                    var form=$("#save-form");
                    var josn=JSON.stringify($('#save-form').serializeObject());
                    vueUI.ajaxCall({
                        url:vueUI.conf.host+form.attr('action'),
                        async:false,
                        data:josn,
                        type:"post",
                        success:function (){
                            vueUI.toolTips("success","保存成功");
                        }
                    });
                    routers.route.go({ path: '/user'});
                }else{
                    vueUI.alert("错误提示","两次输入密码不一致");
                }         
            }
        },
        role_get_all:function(){  //获取所有数据
            var self=this;
            var dt;
            var roles=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/role/get_all',
                async:false,
                type:"get",  
                success:function (rsp){
                    self.$set("roles",roles)
                    dt=rsp.data;
                    for(var i=0;i<dt.length;i++){
                        self.$data.roles.$set(i,{value:dt[i].id,label:dt[i].chineseName})
                    }
                }
            })
        },
        custom_get_all:function (){
            var self=this;
            var dt;
            var customs=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/customer/get_all',
                async:false,
                type:"get",  

                success:function (rsp){
                    self.$set("customs",customs)
                    dt=rsp.data;
                    for(var i=0;i<dt.length;i++){
                        self.$data.customs.$set(i,{value:dt[i].id,label:dt[i].name})
                    } 
                }
            })
        },
        department_get_all:function(){
            var self=this;
            var dt;
            var departments=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/department/get_non_children/-1',
                async:false,
                type:"get",  

                success:function (rsp){
                    self.$set("departments",departments)
                    dt=rsp.data;
                    for(var i=0;i<dt.length;i++){
                        self.$data.departments.$set(i,{value:dt[i].id,label:dt[i].name})
                    }
                }
            })
        },
        role_get:function(id){ 
            var self=this;
            var dt;
            var roles=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/user/get_roles/'+id,
                async:false,
                type:"get",  

                success:function (rsp){
                    self.$set("rolesSelect",roles)
                    dt=rsp.data;
                    for(var i=0;i<dt.length;i++){
                        self.$data.rolesSelect.$set(i,dt[i].id)
                    }
                }
            })
        }
    }
});