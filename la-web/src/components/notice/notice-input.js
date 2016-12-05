var Vue = require('vue');
var VueValidator = require('vue-validator')
Vue.use(VueValidator)
var select = require('vue-strap').select;
var option = require('vue-strap').option;

Vue.component('notice-input',{
    template : __inline('./notice-input.html'),
    props:{
         formTitle:String,
         formId: Number,          
    }, 
    data:function(){
        return{
            content:'',
            title:'',
            usersAll:'',
            selected:'',
            formTitle:'',
            formId:'',
            id:''
        }
    },
    ready : function() {
        var self = this;
        var selected=[];
        var id = $("input[name='id']").val('');
        self.getUsers();
    },
    components:require('/src/components/widge/bootstrapUI/UI'),
    methods:{
        init:function(id){
            this.get(id);
        },      
        get : function(id) {
            var self = this;
            var dt;    
            var ids;
            var userNames;
            var users=self.$data.usersAll; 
            var userInfo=[];
            var selected=[];
            if (id != '-1') {
                vueUI.ajaxCall({
                    url : vueUI.conf.host + '/notice/' + id,                    
                    async : false,
                    type : "get",
                    data : '{"pageNo":1,"id":' + id + '}',                   
                    success : function(rsp) {                        
                        dt = rsp.data; 
                        self.$set('title',dt.title);
                        self.$set('content',dt.content);                                                                    
                    }
                }) 
             
                self.$set("userInfo",userInfo);
                self.$set("selected",selected);
                self.$set('userIds','');
               
                if(dt.userIds){ 
                    self.$set('userIds',dt.userIds);
                    ids=self.$data.userIds.split(','); 
                         
                    for(var i=0;i<ids.length;i++){
                        for(var j=0;j<users.length;j++){
                            if(ids[i]==users[j].value&&ids[i]!=''){ 
                                self.$data.userInfo.$set(i,{id:users[j].value,fullName:users[j].label}); 
                                self.$data.selected.$set(i,users[j].value)               
                                break;
                            }
                        }                              
                    } 
                }
                
                this._data.formTitle='修改公告信息';
                  this._data.formId=id; 
                                                                       
            } else {
                self.$set("id", '')
                self.$set('title','');
                self.$set('content','');
                this._data.formTitle='新增公告信息';
                this._data.formId=''; 
            }

        }, 
        save : function() {
            this.$validate(true);
            var self = this;             
            self.$set("isvalidate", 1);
            if(self.selected!=''&&self.$validation.valid){               
                var form=$('#saveForm');
                var josn=JSON.stringify($('#saveForm').serializeObject());
                vueUI.ajaxCall({
                    url : vueUI.conf.host+form.attr('action'),
                    async : false,
                    data : josn,
                    type : "post",
                    success : function() {
                         self.$parent.search();
                        vueUI.toolTips('success',"保存成功");
                    }
                });
               
                self.close();
                   
            }         
        },
        getUsers:function(){
            var self = this;
            var dt;
            var usersAll=[];
            self.$set('usersAll',usersAll);
            vueUI.ajaxCall({
                url : vueUI.conf.host + '/notice/get_users',
                async : false,
                type : "get",
                dataType:"json",
                data : '',
                success : function(rsp) {
                    dt = rsp.data; 
                    for(var i=0;i<dt.length;i++){
                        self.$data.usersAll.$set(i,{value:dt[i].id,label:dt[i].fullName});
                    }                                              
                }
            })
                             
        },
        isAll:function(event){
            var self=this;
            var users=self.$data.usersAll; 
            var selected=[];
            self.$set('selected',selected);            
            if($(event.currentTarget).prop('checked')){
                for(var i=0;i<users.length;i++){
                    self.$data.selected.$set(i,users[i].value); 
                }       
            } else {
                self.$set('selected',selected);
            }
        },
        close:function(){             
            $('#noticeDialog').hide(30);      
        }        
    } 
});