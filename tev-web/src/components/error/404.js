var Vue = require('vue');

module.exports = Vue.extend({
    ready:function(){
        window.location.href='/error/404.html';
    }
});