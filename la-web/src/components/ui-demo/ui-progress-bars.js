var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./ui-progress-bars.html'),
    el: function() {
        return "#page-content";
    },
    ready: function(){

    }
});