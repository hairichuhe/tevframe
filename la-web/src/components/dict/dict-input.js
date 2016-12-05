var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)

module.exports = Vue.extend({
    template: __inline('./dict-input.html'),
    el: function() {
        return "#portalDialog";
    },
    data:function(){
		return {
            keycode:'',
            value:'',
            type:'',
            remark:''
        }
    },
    ready:function(){
        var self=this;
        var id=$("input[name='id']").val();
        if(id=='-1'){
            $("input[name='id']").val('')            
        }else{
            self.get(id);
        };
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
          var form=$("#save-form")
          if(id!='-1'){
        	vueUI.ajaxCall({
                url:vueUI.conf.host+'/dict/'+id,
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
          }else{self.$set("id",'')}
        },
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
                    type:"post",
                    success:function (){
                        vueUI.toolTips("success","保存成功");
                    }
                });
                vueUI.closeDialog('#portalDialog');
                routers.route.go({ path: '/dict'});       
            }
        }

    }
});