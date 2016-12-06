var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)

module.exports = Vue.extend({
    template: __inline('./role-input.html'),
    el: function() {
        return "#portalDialog";
    },
    data:function(){
        return{
            name:'',
            chineseName:'',
            pIds:'',
            zNodes:''
        }
    },
    ready:function(){
        var self=this;
        var id=$("input[name='id']").val();   
           
        if(id=='-1'||id==''){
            $("input[name='id']").val('')
        }else{
         self.get(id);
        };
        vueUI.inputDialog("#portalDialog")
        self.get_allnodes(id); 
        var setting = {
            check: {
                enable: true,
                chkboxType:{ "Y" : "ps", "N" : "ps" }
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };

        // var zNodes =[
        //     { id:1, pId:0, name:"随意勾选 1", open:true},
        //     { id:11, pId:1, name:"随意勾选 1-1", open:true},
        //     { id:111, pId:11, name:"随意勾选 1-1-1"},
        //     { id:112, pId:11, name:"随意勾选 1-1-2"},
        //     { id:12, pId:1, name:"随意勾选 1-2", open:true},
        //     { id:121, pId:12, name:"随意勾选 1-2-1"},
        //     { id:122, pId:12, name:"随意勾选 1-2-2"},
        //     { id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
        //     { id:21, pId:2, name:"随意勾选 2-1"},
        //     { id:22, pId:2, name:"随意勾选 2-2", open:true},
        //     { id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
        //     { id:222, pId:22, name:"随意勾选 2-2-2"},
        //     { id:23, pId:2, name:"随意勾选 2-3"}
        // ];
        
        
        $.fn.zTree.init($("#treeDemo"), setting, self.zNodes);
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
                url:vueUI.conf.host+'/role/'+id,
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
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var nodes = treeObj.getCheckedNodes(true);
            for(var i=0;i<nodes.length;i++){
                var target=document.getElementById('priStrs');
                target.value+=nodes[i].id+",";
            }
            
            var self=this;
            this.$validate(true);
            if(self.$validation.valid){
                if($("input[name='priStrs']").val()==''){
                    vueUI.alert("错误提示","请至少选择一项权限")
                }else{
                    vueUI.closeDialog('#portalDialog');                
                    var form=$("#saveForm");
                    var josn=JSON.stringify($('#saveForm').serializeObject());
                    vueUI.ajaxCall({
                        url:vueUI.conf.host+form.attr('action'),
                        async:false,
                        data:josn,
                        type:"post",
                        success:function (){
                            vueUI.toolTips("success","保存成功");
                        }
                    });
                    routers.route.go({ path: '/role'});
                }     
            }
        },
        get_allnodes:function(id){
            var self=this;
            var dt;
            var zNodes=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/privilege/get_non_children/-1',
                async:false,
                type:"get",  

                success:function (rsp){
                    self.$set("zNodes",zNodes)
                    dt=rsp.data;
                    for(var i=0;i<dt.length;i++){
                        self.$data.zNodes.$set(i,{id:dt[i].id,pId:dt[i].parentId,name:dt[i].name})       
                    }
                    if(id!=-1&&id!=''){
                        self.get_nownodes(id);
                        for(var i=0;i<dt.length;i++){
                            for(var j=0;j<self.nowNodes.length;j++){
                                if(dt[i].id==self.nowNodes[j].id){
                                    self.$data.zNodes.$set(i,{id:dt[i].id,pId:dt[i].parentId,name:dt[i].name,checked:true,open:true})  
                                }
                            }      
                        }
                    };
                }
            })      
        },
        get_nownodes:function(id){
            var me=this;
            var nowdt;
            var nowNodes=[];
            vueUI.ajaxCall({
                url:vueUI.conf.host+'/role/get_privileges/'+id,
                async:false,
                type:"get",  
                success:function (rsp){
                    me.$set("nowNodes",nowNodes)
                    nowdt=rsp.data;
                    for(var i=0;i<nowdt.length;i++){
                        me.$data.nowNodes.$set(i,{id:nowdt[i].id,pId:nowdt[i].parentId,name:nowdt[i].name})
                    }
                }
            })
        }

    }
});