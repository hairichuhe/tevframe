var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)
var select = require('vue-strap').select;
var option = require('vue-strap').option;

module.exports = Vue.extend({
    template: __inline('./privilege-input.html'),
    el: function() {
        return "#portalDialog";
    },
    data:function(){
        return{
            parentId:'',
            types:'',
            name:'',
            code:'',
            ico:'',
            url:'',
            parentSelect:'',
            typeSelect:'',
            html:''
        }
    },
    ready:function(){
        var self=this;
        var id=$("input[name='id']").val();
        if(id=='-1'){
            $("input[name='id']").val('');
            self.parent_get_all();
        }else{
         self.get(id);
         self.parent_get_all();
        };
        if(self.parentId==null){
            self.parentSelect='';
        }
        self.$set("types",[{value:"0",label:"菜单"},{value:"1",label:"按钮"}]);
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
          var form=$("#save-form")
          if(id!='-1'){
        	  vueUI.ajaxCall({
                url:vueUI.conf.host+'/privilege/'+id,
                async:false,
                type:"get",
                data:
                    '{"pageNo":1,"id":'+id+'}'
                ,
                success:function (rsp){
                    dt=rsp.data;
                }
            }) 
            self.$data=dt;
            if(dt.parentId==null){
                self.$set("parentSelect",'')
            }else{
                self.$set("parentSelect",dt.parentId)
            };
            if(dt.type!=''){     
                self.$set("typeSelect",dt.type)
            }else{
                self.$set("typeSelect",'0')
            }
          }else{self.$set("id",'')}
        },
        save:function (){
            var self=this;
            this.$validate(true);
            if(self.$validation.valid){
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
                routers.route.go({ path: '/privilege'});   
            }
        },
        parent_get_all:function(){  //获取所有数据
            var self=this;
            var dt;
            var parentId=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/privilege/get_non_children/-1',
                async:false,
                type:"get",  
                success:function (rsp){
                    self.$set("parentId",parentId)
                    dt=rsp.data;
                    for(var i=0;i<dt.length;i++){
                        self.$data.parentId.$set(i,{value:dt[i].id,label:dt[i].name})
                    }
                }
            })
        },
    }
});