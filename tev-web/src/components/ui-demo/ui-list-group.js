var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./ui-list-group.html'),
    el: function() {
        return "#page-content";
    },
    ready: function(){

    }
});