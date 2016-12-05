module.exports = {
	
	/**
	 * ajax 提交 <br>
	 * 参数：option，需要设置的内容type、url、data、success即可
	 */
	ajaxCall: function(option){
		var errorHandler = function(rsp,callback) {
			if(rsp.status==0){
				vueUI.alert("错误提示","服务器错误，请联系管理员或再试一次！",callback)
			}else{
		        var err=JSON.parse(rsp.responseText);
		        if(err.meta.code==400){
					vueUI.alert("错误提示","账号或密码错误",callback)
				}else if(err.meta.code==500){
					vueUI.alert("错误提示","服务器错误，请联系管理员!<br>错误信息："+err.meta.message,callback)
				}else if(err.meta.code==401){
					vueUI.alert("错误提示","您没有访问权限,请登录",callback);
					vueUI.gotoLogin();
				}else if(err.meta.code==403){
					vueUI.alert("错误提示","服务器拒绝请求，请登录",callback)
					vueUI.gotoLogin();
				}else{
					vueUI.alert("错误提示","你请求的页面发生错误!<br>错误信息："+err.meta.message,callback)
				}
			}
	    };
		var defaults  = {
			beforeSend:function (XHR){
                XHR.setRequestHeader('Authorization','Bearer '+window.sessionStorage.access_token);////////设置消息头
            },
			type:"post",
			dataType : 'json',
			contentType:'application/json;charset=utf-8',
		};
		var settings = $.extend({},defaults,option);
		
		settings.error=function (rsp){
			if(option.error){
				errorHandler(rsp,function(){
					option.error(rsp);
				})
			}else{
				errorHandler(rsp)
			}
		};
		$.ajax(settings);
	},
	/**
	 * 提示框 <br>
	 * 参数：title：标题，message：提示消息;callback：回调函数
	 */
  	alert: function(title,message,callback) {
	    $("#portalAlert",$("body")).remove();
		$(".modal-backdrop",$("body")).remove();

		var modal = '<div id="portalAlert" class="modal">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<button type="button" class="close"><span aria-hidden="true">&times;</span></button>'+
						'<p class="modal-title">'+title+'</p>'+
					'</div>'+
					'<div class="modal-body">'+
						'<h4>'+message+'</h4>'+
					'</div>'+
					'<div class="modal-footer" style="font-size:14px">'+
						'<button type="button" class="btn btn-primary btn-lg ok" style="padding:4px 8px;">确定</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="modal-backdrop fade in"></div>';
		modal = $(modal).addClass("fade");
		$("body").append(modal);
		modal.show(30,function(){
			modal.addClass("in");
		});

		$("button.close,button.btn-close",modal).click(function(){
			$("#portalAlert",$("body")).removeClass("in").delay(300).hide(30,function(){
				$("#portalAlert",$("body")).remove();
				$(".modal-backdrop",$("body")).remove();
				if(callback){
					callback();
				}
			});
		});

		$("button.ok",modal).click(function(){
			$("#portalAlert",$("body")).removeClass("in").delay(300).hide(30,function(){
				$("#portalAlert",$("body")).remove();
				$(".modal-backdrop",$("body")).remove();
				if(callback){
					callback();
				}
			});
		});
 	},
	/**
	 * 确认提示框 <br>
	 * 参数：title：标题，message：提示消息，callback：回调函数
	 */
	confirm: function(title,message,callback){
		$("#portalConfirm",$("body")).remove();
		$(".modal-backdrop",$("body")).remove();
		
		var modal = '<div id="portalConfirm" class="modal" aria-hidden="true">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span aria-hidden="true">&times;</span></button>'+
						'<h5 class="modal-title">'+title+'</h5>'+
					'</div>'+
					'<div class="modal-body">'+
						'<h4>'+message+'</h4>'+
					'</div>'+
					'<div class="modal-footer">'+
						'<button type="button" style="padding:4px 8px;" class="btn btn-default btn-lg btn-close" data-dismiss="modal" aria-hidden="true">取消</button>'+
						'<button type="button" class="btn btn-primary btn-lg ok" style="padding:4px 8px;">确定</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="modal-backdrop fade in"></div>';
		modal = $(modal).addClass("fade");
		$("body").append(modal);
		modal.fadeIn(30,function(){
			modal.addClass("in");
		});
		
		
		$("button.close,button.btn-close",modal).click(function(){
			$("#portalConfirm",$("body")).removeClass("in").delay(300).fadeOut(30,function(){
				$("#portalConfirm",$("body")).remove();	
				$(".modal-backdrop",$("body")).remove();
			});
		});
		
		$("button.ok",modal).click(function(){
			$("#portalConfirm",$("body")).removeClass("in").delay(300).fadeOut(30,function(){
				$("#portalConfirm",$("body")).remove();
				$(".modal-backdrop",$("body")).remove();
				if(callback){
					callback();
				}
			});
		});			
	},
	/**
	 * input界面的模态弹出窗口 <br>
	 * 参数：dom：form的div id
	 */
  	inputDialog: function(dom) {

		var mack = '<div class="modal-backdrop fade in"></div>';

		$("body").append(mack);
		$("body").append($(dom));
		$(dom,"#content-container").remove();
		$(dom).attr("max-height",$(window).height()-100+"px")
		$(dom).show(30);
		
		$("button.close,button.btn-close",$(dom)).click(function(){
			$(dom,$("body")).removeClass("in").delay(300).fadeOut(30,function(){
				$(dom,$("body")).remove();	
				$(".modal-backdrop",$("body")).remove();
			});
		});				
 	},

 	/**
	 * 关闭input界面的模态弹出窗口 <br>
	 * 参数：dom：form的div id
	 */
 	closeDialog:function(dom){
 		$(dom,$("body")).removeClass("in").delay(300).fadeOut(30,function(){
				$(dom,$("body")).remove();	
				$(".modal-backdrop",$("body")).remove();
			});
 	},

	/**
	 * 返回登录页 <br>
	 */
	gotoLogin:function (){
		window.sessionStorage.goto_url=window.location.href;
		window.location.href='/login.html';
	},
	/* 提示框的弹出事件
		参数1，弹出框的状态--成功,提示或者失败
		参数2，提示信息
	*/
	toolTips:function(status,msg){
			var k = [{
						icon: "fa fa-star fa-lg",
						title: "操作提示",
						type: "primary"
					}, {
						icon: "fa fa-thumbs-up fa-lg",
						title: "操作提示",
						type: "success"
					}, {
						icon: "fa fa-bolt fa-lg",
						title: "操作提示",
						type: "warning"
					}, {
						icon: "fa fa-times fa-lg",
						title: "错误提示",
						type: "danger"
					}];
		var t=-1;
		if(status=='success'){
			t=1;
		} else if(status=='warning'){
			t=2;
		} else if(status=='danger'){
			t=3;
		} else {
			t=0;
		}
		if(t!=-1){
			 
			$.niftyNoty({
				type: k[t].type,
				icon: k[t].icon,
				title: k[t].title,
				message: msg,
				container: "floating",
				timer: 3500
			})
		}
	},
	/* 添加加载动画
		参数，提示文本
	*/
	showLoading:function(msg){
		$("#portalLoading",$("body")).remove();
		$(".modal-backdrop",$("body")).remove();
		var textStatue;
		if(msg){
			textStatue=msg
		}else{
			textStatue="加载中"
		}
		var modal = '<div id="portalLoading" class="modal">'+
			'<div class="modal-dialog modal-sm">'+
				'<div class="modal-content" style="background: transparent;">'+
					"<style type=\"text/css\">\r\n.load-container {\r\n    box-sizing: border-box;\r\n     float: left;\r\n    height: 120px;\r\n    overflow: hidden;\r\n    position: relative;\r\n    width: 120px;\r\n}\r\n.load4 .loader {\r\n  font-size: 10px;\r\n  margin: 5em auto;\r\n  width: 1em;\r\n  height: 1em;\r\n  border-radius: 50%;\r\n  position: relative;\r\n  text-indent: -9999em;\r\n  -webkit-animation: load4 1.3s infinite linear;\r\n  animation: load4 1.3s infinite linear;\r\n}\r\n@-webkit-keyframes load4 {\r\n  0%,\r\n  100% {\r\n    box-shadow: 0em -3em 0em 0.2em #C23531, 2em -2em 0 0em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 0em #C23531;\r\n  }\r\n  12.5% {\r\n    box-shadow: 0em -3em 0em 0em #C23531, 2em -2em 0 0.2em #C23531, 3em 0em 0 0em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  25% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 0em #C23531, 3em 0em 0 0.2em #C23531, 2em 2em 0 0em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  37.5% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 0em #C23531, 2em 2em 0 0.2em #C23531, 0em 3em 0 0em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  50% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 0em #C23531, 0em 3em 0 0.2em #C23531, -2em 2em 0 0em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  62.5% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 0em #C23531, -2em 2em 0 0.2em #C23531, -3em 0em 0 0em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  75% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 0em #C23531, -3em 0em 0 0.2em #C23531, -2em -2em 0 0em #C23531;\r\n  }\r\n  87.5% {\r\n    box-shadow: 0em -3em 0em 0em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 0em #C23531, -3em 0em 0 0em #C23531, -2em -2em 0 0.2em #C23531;\r\n  }\r\n}\r\n@keyframes load4 {\r\n  0%,\r\n  100% {\r\n    box-shadow: 0em -3em 0em 0.2em #C23531, 2em -2em 0 0em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 0em #C23531;\r\n  }\r\n  12.5% {\r\n    box-shadow: 0em -3em 0em 0em #C23531, 2em -2em 0 0.2em #C23531, 3em 0em 0 0em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  25% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 0em #C23531, 3em 0em 0 0.2em #C23531, 2em 2em 0 0em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  37.5% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 0em #C23531, 2em 2em 0 0.2em #C23531, 0em 3em 0 0em #C23531, -2em 2em 0 -0.5em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  50% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 0em #C23531, 0em 3em 0 0.2em #C23531, -2em 2em 0 0em #C23531, -3em 0em 0 -0.5em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  62.5% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 0em #C23531, -2em 2em 0 0.2em #C23531, -3em 0em 0 0em #C23531, -2em -2em 0 -0.5em #C23531;\r\n  }\r\n  75% {\r\n    box-shadow: 0em -3em 0em -0.5em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 0em #C23531, -3em 0em 0 0.2em #C23531, -2em -2em 0 0em #C23531;\r\n  }\r\n  87.5% {\r\n    box-shadow: 0em -3em 0em 0em #C23531, 2em -2em 0 -0.5em #C23531, 3em 0em 0 -0.5em #C23531, 2em 2em 0 -0.5em #C23531, 0em 3em 0 -0.5em #C23531, -2em 2em 0 0em #C23531, -3em 0em 0 0em #C23531, -2em -2em 0 0.2em #C23531;\r\n  }\r\n}\r\n</style>\r\n<div style=\"background-color:#FFF;border-radius:4px;\">\r\n  <div class=\"load-container load4\">\r\n    <div class=\"loader\">Loading...</div>\r\n  </div>\r\n  <span style=\"line-height: 120px; font-size: 24px; display: inline-block;\">"+textStatue+"......</span>\r\n</div>"+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="modal-backdrop fade in"></div>';
		modal = $(modal).addClass("fade");
		$("body").append(modal);
		modal.show(30,function(){
			modal.addClass("in");
		});
	},
	/* 移除加载动画
		
	*/
	hideLoading:function(){
		$("#portalLoading",$("body")).removeClass("in").delay(300).hide(30,function(){
			$("#portalLoading",$("body")).remove();
			$(".modal-backdrop",$("body")).remove();
		});
	},
	conf:eval("("+$.ajax({url:"/config/conf.json",async:false}).responseText+")")
}