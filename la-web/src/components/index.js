var isCompated=false;

function isIE(){
    if(!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }else{
        return false;
    }
};

function IEVersion(){
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer'){
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

        if (re.exec(ua) != null){
            rv = parseFloat( RegExp.$1 );
        }
    } else if (navigator.appName == 'Netscape'){
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null){
          rv = parseFloat( RegExp.$1 );
        }
    }
    
    return rv;
};
if (isIE()) {//IE浏览器
    if (IEVersion() < 10) {
        isCompated=false;
    } else {
        isCompated=true;
    }
}else{
    isCompated=true;
};
if(!isCompated){
    window.location.href='/error/nonsupport.html';
};
if(window.location.href.indexOf("/#!")==-1){
    window.location.href='/#!/';
};

var Vue = require('vue');

window.vueUI=require('vueUI')
window.routers=require('routers');
require('/src/components/widge/pageTitle/pageTitle');
require('/src/components/widge/bootstrapUI/UI')

// if(!window.sessionStorage.access_token){
//     vueUI.gotoLogin();
// }else{
    var App = Vue.extend({
    	el: function() {
            return '#container';
        },
        components: {
            'i-header':require('/src/components/index/header.js'),
            'i-mainnav':require('/src/components/index/mainnav.js'),
            'i-rightnav':require('/src/components/index/rightnav.js'),
            'i-footer':require('/src/components/index/footer.js'),
            'i-themeconfig':require('/src/components/index/themeconfig.js')
        }
    });
    routers.route.start(App, '#container');
// }