var Vue = require('vue');

module.exports = Vue.extend({
    template: __inline('./checkboxgrop.html'),
    props:{
    	options:{        //传入的checkbox数组
    		type:Array,
    		default:[
                    {value:'option1',display:'选项一',style : 'form-normal',checked:true},    //style需要添加的新的class名字，类型为字符串 checked是否选中
                    {value:'option2',display:'选项二',style : 'form-normal'},
                    {value:'option3',display:'选项三',style : 'form-normal'}
                    ]
    	},
    	model:{            //显示所选中的值
    		type:Array,
            default:new Array(),
            twoWay: true
    	},
    	type:{            //决定横排显示还是竖排显示  默认横显示，如果要竖排显示 设置 style为'form-block'
    		type:String
    	},
        name:{              //往后台传值的字段名
            type:String
        }
    },
    ready:function(){

            console.info(typeof this.model)
        },
    methods:{
        handleClick:function(v){
            if($(v.currentTarget).parent('label').hasClass('disabled')){
                v.preventDefault();
                v.stopPropagation();
            }else{
                $(v.currentTarget).parent('label').toggleClass('active');
            }
        }
    }
});
/*
使用说明：根据props的值来确定，一目了然
 */