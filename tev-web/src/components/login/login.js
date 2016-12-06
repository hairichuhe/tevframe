var Vue = require('vue');
var VueValidator=require('vue-validator')
Vue.use(VueValidator)
window.vueUI=require('vueUI')
new Vue({
  el: '#container',
  methods:{
  	login:function(event){ 
  		event.preventDefault();
	    event.stopPropagation(); 
  		var data=$('#loginForm').serialize();
  		var self=this;
        this.$validate(true);
		if(self.$validation.valid){
			if($('#conVerificationCode').val()==$("#nowCode").val()){
				window.sessionStorage.user_name=$('input[name="username"]').val();
				window.sessionStorage.user_password=$('input[name="password"]').val();
				if($("#rememeber").prop("checked")){
					$.cookie("user_name",$('input[name="username"]').val(), { expires: 7 });
				}else{
					$.cookie("user_name",$('input[name="username"]').val(), { expires: -1 });
				}
				vueUI.ajaxCall({
					beforeSend:function (XHR){
						XHR.setRequestHeader('Authorization','Basic ' + btoa(vueUI.conf.client_id + ':' + vueUI.conf.client_secret));////////设置消息头
						//XHR.setRequestHeader('Postman-Token','f9ecf67a-892d-8325-9da3-721e6842f7c1');
					},
					url:vueUI.conf.auth_host+"/oauth/token",
					async:true,
					datatype:"json",
					type:"post",
					data:data,
					contentType:'application/x-www-form-urlencoded',
					success:function(rsp){
						window.sessionStorage.access_token=rsp.access_token;
						var str=window.sessionStorage.goto_url;
						if(window.sessionStorage.goto_url){
							if(str.indexOf("#!/")=='-1'){
								window.location.href='/#!/';
								window.sessionStorage.removeItem("goto_url");
							}else{
								window.location.href=window.sessionStorage.goto_url;
								window.sessionStorage.removeItem("goto_url");
							}
						}else{
							window.location.href="/#!/";
						}
					},
					error:function(rsp){
						if(rsp.status!=0){
							var err=JSON.parse(rsp.responseText);
					        if(err.meta.code==999){
								vueUI.alert("错误提示",err.meta.message)
							}
						}	
					}
				})
			}else{
				vueUI.alert("错误提示","验证码错误")
			}
		}
  	}
  }
})