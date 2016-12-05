var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./forms-general.html'),
    el: function() {
        return "#page-content";
    }
});