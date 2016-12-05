//页头组件 1.require 2.<page-title></page-title>
var Vue = require('vue');

Vue.component('page-title',{
	template:__inline('./pageTitle.html'),
	props:["items"]
})
