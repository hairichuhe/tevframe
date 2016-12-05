var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./ui-helper-classes.html'),
    el: function() {
        return "#page-content";
    },
    ready: function(){

    }
});