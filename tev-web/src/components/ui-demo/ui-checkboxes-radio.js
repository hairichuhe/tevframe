var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./ui-checkboxes-radio.html'),
    el: function() {
        return "#page-content";
    }
});