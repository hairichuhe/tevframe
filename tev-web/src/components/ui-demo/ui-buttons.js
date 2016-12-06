var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./ui-buttons.html'),
    el: function() {
        return "#page-content";
    },
    ready: function(){
		// Buttons.js
		// ====================================================================
		// ====================================================================
		// - ThemeOn.net -

		// STATE BUTTON
		// =================================================================
		// Require Bootstrap Button
		// -----------------------------------------------------------------
		// http://getbootstrap.com/javascript/#buttons
		// =================================================================
		$('#demo-state-btn').on('click', function () {
			var btn = $(this).button('loading')
			// business logic...

			var doSomething = setTimeout(function(){
				clearTimeout(doSomething);
				btn.button('reset')
			}, 3000);
		});
    },
    methods:{
    	togAside:function(e){
			e.preventDefault(), nifty.container.hasClass("aside-in") ? ($.niftyAside("hide")) : ($.niftyAside("show"))	
    	},
    	togMainnav:function(e){
			e.preventDefault(), nifty.container.hasClass("mainnav-lg") ? (nifty.container.removeClass("mainnav-lg"),nifty.container.addClass("mainnav-sm")) : (nifty.container.removeClass("mainnav-sm"),nifty.container.addClass("mainnav-lg"))
    	},
    	tradeSkin:function(event){
    		event.preventDefault;
    		event.stopPropagation;
    		var type=$(event.currentTarget).attr("data-type");
    		var theme=$(event.currentTarget).attr("data-theme");
    		$("#theme").attr("href","/static/css/themes/themes-"+type+"/"+theme+".min.css");
    		$("#demo-theme a").removeClass("disabled");
    		var culsA=$("#demo-theme a");
    		for(var i=0;i<culsA.length;i++){
    			if($(culsA[i]).attr("data-type")==type && $(culsA[i]).attr("data-theme")==theme){
    				$(culsA[i]).addClass("disabled")
    			}
    		}
    	}
    }
});