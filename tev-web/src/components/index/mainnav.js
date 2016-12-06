var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('/src/components/index/mainnav.html'),
    el:function(){
    	return "#mainnav-container"
    },
    ready:function (){
    	var self=this;
        vueUI.ajaxCall({
            type:"get",
            url:vueUI.conf.host+"/user/get_curr_user",
            success:function(rsp){
                if(rsp.data.username=="admin"){
                    self.$set("isAdmin",true)
                }
            }
        });
        !function(n) {
            "use strict";
            var t = n('#mainnav-menu > li > a, #mainnav-menu-wrap .mainnav-widget a[data-toggle="menu-widget"]'),
            i = n("#mainnav").height(),
            e = !1,
            a = !1,
            o = null,
            s = function() {
                var i;
                t.each(function() {
                    var e = n(this),
                    a = e.children(".menu-title"),
                    o = e.siblings(".collapse"),
                    s = n(e.attr("data-target")),
                    r = s.length ? s.parent() : null,
                    l = null,
                    c = null,
                    f = null,
                    d = null,
                    v = (e.outerHeight() - e.height() / 4,
                    function() {
                        return s.length && e.on("click",
                        function(n) {
                            n.preventDefault()
                        }),
                        o.length ? (e.on("click",
                        function(n) {
                            n.preventDefault()
                        }).parent("li").removeClass("active"), !0) : !1
                    } ()),
                    u = null,
                    m = function(n) {
                        clearInterval(u),
                        u = setInterval(function() {
                            n.nanoScroller({
                                preventPageScrolling: !0,
                                alwaysVisible: !0
                            }),
                            clearInterval(u)
                        },
                        700)
                    };
                    n(document).click(function(t) {
                        n(t.target).closest("#mainnav-container").length || e.removeClass("hover").popover("hide")
                    }),
                    n("#mainnav-menu-wrap > .nano").on("update",
                    function() {
                        e.removeClass("hover").popover("hide")
                    }),
                    e.popover({
                        animation: !1,
                        trigger: "manual",
                        container: "#mainnav",
                        viewport: e,
                        html: !0,
                        title: function() {
                            return v ? a.html() : null
                        },
                        content: function() {
                            var t;
                            return v ? (t = n('<div class="sub-menu"></div>'), o.addClass("pop-in").wrap('<div class="nano-content"></div>').parent().appendTo(t)) : s.length ? (t = n('<div class="sidebar-widget-popover"></div>'), s.wrap('<div class="nano-content"></div>').parent().appendTo(t)) : t = '<span class="single-content">' + a.html() + "</span>",
                            t
                        },
                        template: '<div class="popover menu-popover"><h4 class="popover-title"></h4><div class="popover-content"></div></div>'
                    }).on("show.bs.popover",
                    function() {
                        if (!l) {
                            if (l = e.data("bs.popover").tip(), c = l.find(".popover-title"), f = l.children(".popover-content"), !v && 0 == s.length) return;
                            d = f.children(".sub-menu")
                        } ! v && 0 == s.length
                    }).on("shown.bs.popover",
                    function() {
                        if (!v && 0 == s.length) {
                            var t = 0 - .5 * e.outerHeight();
                            return void f.css({
                                "margin-top": t + "px",
                                width: "auto"
                            })
                        }
                        var i = parseInt(l.css("top")),
                        a = e.outerHeight(),
                        o = function() {
                            return nifty.container.hasClass("mainnav-fixed") ? n(window).outerHeight() - i - a: n(document).height() - i - a
                        } (),
                        r = f.find(".nano-content").children().css("height", "auto").outerHeight();
                        f.find(".nano-content").children().css("height", ""),
                        i > o ? (c.length && !c.is(":visible") && (a = Math.round(0 - .5 * a)), i -= 5, f.css({
                            top: "",
                            bottom: a + "px",
                            height: i
                        }).children().addClass("nano").css({
                            width: "100%"
                        }).nanoScroller({
                            preventPageScrolling: !0
                        }), m(f.find(".nano"))) : (!nifty.container.hasClass("navbar-fixed") && nifty.mainNav.hasClass("affix-top") && (o -= 50), r > o ? ((nifty.container.hasClass("navbar-fixed") || nifty.mainNav.hasClass("affix-top")) && (o -= a + 5), o -= 5, f.css({
                            top: a + "px",
                            bottom: "",
                            height: o
                        }).children().addClass("nano").css({
                            width: "100%"
                        }).nanoScroller({
                            preventPageScrolling: !0
                        }), m(f.find(".nano"))) : (c.length && !c.is(":visible") && (a = Math.round(0 - .5 * a)), f.css({
                            top: a + "px",
                            bottom: "",
                            height: "auto"
                        }))),
                        c.length && c.css("height", e.outerHeight()),
                        f.on("click",
                        function() {
                            f.find(".nano-pane").hide(),
                            m(f.find(".nano"))
                        })
                    }).on("hidden.bs.popover",
                    function() {
                        e.removeClass("hover"),
                        v ? o.removeAttr("style").appendTo(e.parent()) : s.length && s.appendTo(r),
                        clearInterval(i)
                    }).on("click",
                    function() {
                        nifty.container.hasClass("mainnav-sm") && (t.popover("hide"), e.addClass("hover").popover("show"))
                    }).hover(function() {
                        t.popover("hide"),
                        e.addClass("hover").popover("show")
                    },
                    function() {
                        clearInterval(i),
                        i = setInterval(function() {
                            l && (l.one("mouseleave",
                            function() {
                                e.removeClass("hover").popover("hide")
                            }), l.is(":hover") || e.removeClass("hover").popover("hide")),
                            clearInterval(i)
                        },
                        500)
                    })
                }),
                a = !0
            },
            r = function() {
                t.popover("destroy").unbind("mouseenter mouseleave"),
                a = !1
            },
            l = function() {
                var t, i = nifty.container.width();
                t = 740 >= i ? "xs": i > 740 && 992 > i ? "sm": i >= 992 && 1200 >= i ? "md": "lg",
                o != t && (o = t, nifty.screenSize = t, "sm" == nifty.screenSize && nifty.container.hasClass("mainnav-lg") && n.niftyNav("collapse"))
            },
            c = function() {
                return nifty.mainNav.niftyAffix("update"),
                r(),
                l(),
                ("collapse" == e || nifty.container.hasClass("mainnav-sm")) && (nifty.container.removeClass("mainnav-in mainnav-out mainnav-lg"), s()),
                i = n("#mainnav").height(),
                e = !1,
                null
            },
            f = {
                revealToggle: function() {
                    nifty.container.hasClass("reveal") || nifty.container.addClass("reveal"),
                    nifty.container.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"),
                    a && r()
                },
                revealIn: function() {
                    nifty.container.hasClass("reveal") || nifty.container.addClass("reveal"),
                    nifty.container.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"),
                    a && r()
                },
                revealOut: function() {
                    nifty.container.hasClass("reveal") || nifty.container.addClass("reveal"),
                    nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"),
                    a && r()
                },
                slideToggle: function() {
                    nifty.container.hasClass("slide") || nifty.container.addClass("slide"),
                    nifty.container.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"),
                    a && r()
                },
                slideIn: function() {
                    nifty.container.hasClass("slide") || nifty.container.addClass("slide"),
                    nifty.container.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"),
                    a && r()
                },
                slideOut: function() {
                    nifty.container.hasClass("slide") || nifty.container.addClass("slide"),
                    nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"),
                    a && r()
                },
                pushToggle: function() {
                    nifty.container.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"),
                    nifty.container.hasClass("mainnav-in mainnav-out") && nifty.container.removeClass("mainnav-in"),
                    a && r()
                },
                pushIn: function() {
                    nifty.container.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"),
                    a && r()
                },
                pushOut: function() {
                    nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"),
                    a && r()
                },
                colExpToggle: function() {
                    return nifty.container.hasClass("mainnav-lg mainnav-sm") && nifty.container.removeClass("mainnav-lg"),
                    nifty.container.toggleClass("mainnav-lg mainnav-sm").removeClass("mainnav-in mainnav-out"),
                    nifty.window.trigger("resize")
                },
                collapse: function() {
                    return nifty.container.addClass("mainnav-sm").removeClass("mainnav-lg mainnav-in mainnav-out"),
                    e = "collapse",
                    nifty.window.trigger("resize")
                },
                expand: function() {
                    return nifty.container.removeClass("mainnav-sm mainnav-in mainnav-out").addClass("mainnav-lg"),
                    nifty.window.trigger("resize")
                },
                togglePosition: function() {
                    nifty.container.toggleClass("mainnav-fixed"),
                    nifty.mainNav.niftyAffix("update")
                },
                fixedPosition: function() {
                    nifty.container.addClass("mainnav-fixed"),
                    nifty.mainNav.niftyAffix("update")
                },
                staticPosition: function() {
                    nifty.container.removeClass("mainnav-fixed"),
                    nifty.mainNav.niftyAffix("update")
                },
                update: c,
                forceUpdate: l,
                getScreenSize: function() {
                    return o
                }
            };
            n.niftyNav = function(n, t) {
                if (f[n]) { ("colExpToggle" == n || "expand" == n || "collapse" == n) && ("xs" == nifty.screenSize && "collapse" == n ? n = "pushOut": "xs" != nifty.screenSize && "sm" != nifty.screenSize || "colExpToggle" != n && "expand" != n || !nifty.container.hasClass("mainnav-sm") || (n = "pushIn"));
                    var i = f[n].apply(this, Array.prototype.slice.call(arguments, 1));
                    if (t) return t();
                    if (i) return i
                }
                return null
            },
            n.fn.isOnScreen = function() {
                var n = {
                    top: nifty.window.scrollTop(),
                    left: nifty.window.scrollLeft()
                };
                n.right = n.left + nifty.window.width(),
                n.bottom = n.top + nifty.window.height();
                var t = this.offset();
                return t.right = t.left + this.outerWidth(),
                t.bottom = t.top + this.outerHeight(),
                !(n.right < t.left || n.left > t.right || n.bottom < t.bottom || n.top > t.top)
            },
            nifty.window.on("resizeEnd", c).trigger("resize"),
            nifty.window.on("load")
        } (jQuery)
    },
    data: function(){
		var menus = [];
		var self=this;
    	vueUI.ajaxCall({
			url:vueUI.conf.host+"/user/get_privileges",
			async:false,
			type:"GET",
			success:function (rsp){
				var dts = rsp.data;
				menus = dts;
			}
		});             
		return {menus:menus};
	},
	methods:{
		checkMenu:function(mid,url){ 
			if(null != mid&&url!=''){
				$("#mainnav-menu li").removeClass("active-link");
				$("#mainnav-menu li").removeClass("active");
				
				$("#"+mid).addClass("active-link");
			}
		},
        goRouter:function(url){
        	routers.route.go(url);
        },
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
