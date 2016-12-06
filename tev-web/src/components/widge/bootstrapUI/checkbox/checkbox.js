var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./checkbox.html'),
    props:{
    	checked:{                     //决定是否选中
    		type:Boolean,
    		default:true
    	},
    	style:{							//决定显示效果：如form-normal  form-icon
    		type:String,
    		default:'form-normal'
    	},
    	name:{							//要传入后台的字段的name
    		type:String,
    		default:'enabled'
    	},
    	displayName:{					//页面显示名称
    		type:String,
    		default:'可用'
    	},
        method:{                        //默认点击选框需要执行的事件
            type:Function
        }
    }
});
/*
使用说明：根据props的值来确定，一目了然
 */