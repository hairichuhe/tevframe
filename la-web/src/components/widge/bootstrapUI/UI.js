var strap = require('vue-strap');
var Vue = require('vue');
Vue.component('v-select', strap.select);
Vue.component('v-checkbox', require("./checkbox/checkbox.js"));
Vue.component('v-checkboxgrop', require("./checkboxgrop/checkboxgrop.js"));
Vue.component('v-radiogrop', require("./radiogrop/radiogrop.js"));