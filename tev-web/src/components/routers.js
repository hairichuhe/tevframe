var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var router = new VueRouter();
router.map({
    // ui-demo ====================================================
    '/widgets': {
        component:(function(resolve) {
            return require(['widgets'], resolve);
        })
    },  
    '/ui-buttons': {
        component:(function(resolve) {
            return require(['ui-buttons'], resolve);
        })
    },  
    '/ui-checkboxes-radio': {
        component:(function(resolve) {
            return require(['ui-checkboxes-radio'], resolve);
        })
    },    
    '/ui-panels': {
        component:(function(resolve) {
            return require(['ui-panels'], resolve);
        })
    },
    '/ui-modals': {
        component:(function(resolve) {
            return require(['ui-modals'], resolve);
        })
    },
    '/ui-progress-bars': {
        component:(function(resolve) {
            return require(['ui-progress-bars'], resolve);
        })
    },
    '/ui-components': {
        component:(function(resolve) {
            return require(['ui-components'], resolve);
        })
    },
    '/ui-typography': {
        component:(function(resolve) {
            return require(['ui-typography'], resolve);
        })
    },
    '/ui-list-group': {
        component:(function(resolve) {
            return require(['ui-list-group'], resolve);
        })
    },
    '/ui-tabs-accordions': {
        component:(function(resolve) {
            return require(['ui-tabs-accordions'], resolve);
        })
    },
    '/ui-alerts-tooltips': {
        component:(function(resolve) {
            return require(['ui-alerts-tooltips'], resolve);
        })
    },
    '/ui-helper-classes': {
        component:(function(resolve) {
            return require(['ui-helper-classes'], resolve);
        })
    },
    '/forms-general': {
        component:(function(resolve) {
            return require(['forms-general'], resolve);
        })
    },
    '/forms-components': {
        component:(function(resolve) {
            return require(['forms-components'], resolve);
        })
    },
    '/forms-validation': {
        component:(function(resolve) {
            return require(['forms-validation'], resolve);
        })
    },
    '/forms-wizard': {
        component:(function(resolve) {
            return require(['forms-wizard'], resolve);
        })
    },
    '/tables': {
        component:(function(resolve) {
            return require(['tables'], resolve);
        })
    },
    '/charts': {
        component:(function(resolve) {
            return require(['charts'], resolve);
        })
    },
    '/mailbox': {
        component:(function(resolve) {
            return require(['mailbox'], resolve);
        })
    },
    '/mailbox-message': {
        component:(function(resolve) {
            return require(['mailbox-message'], resolve);
        })
    },
    '/mailbox-compose': {
        component:(function(resolve) {
            return require(['mailbox-compose'], resolve);
        })
    },
    // ui-demo end ================================================

    '/': {
        component: (function(resolve) {
            return require(['main'], resolve);
        })
    },
    '/main': {
        component: (function(resolve) {
            return require(['main'], resolve);
        })
    },
    '/dict': {
        name: 'dict',
        component:(function(resolve) {
            return require(['dict'], resolve);
        }),
        subRoutes:{
            '/edit/:id':{
                component:(function(resolve) {
                    return require(['dict-input'], resolve);
                })
            }
        }
    },
    '/customer': {
        name: 'customer',
        component:(function(resolve) {
            return require(['customer'], resolve);
        }),
        subRoutes:{
            '/edit/:id':{
                component:(function(resolve) {
                    return require(['customer-input'], resolve);
                })
            }
        }
    },
    '/department': {
        name: 'department',
        component:(function(resolve) {
            return require(['department'], resolve);
        }),
        subRoutes:{
            '/edit/:id':{
                component:(function(resolve) {
                    return require(['department-input'], resolve);
                })
            }
        }
    },
    '/user': {
        component:(function(resolve) {
            return require(['user'], resolve);
        }),
        subRoutes:{
            '/edit/:id':{
                component:(function(resolve) {
                    return require(['user-input'], resolve);
                })
            }
        }
    },
    '/usercenter': {
        component:(function(resolve) {
            return require(['usercenter'], resolve);
        })
    },
    '/resetPass': {
        component:(function(resolve) {
            return require(['resetPass'], resolve);
        })
    },
    '/privilege': {
        component:(function(resolve) {
            return require(['privilege'], resolve);
        }),
        subRoutes:{
            '/edit/:id':{
                component:(function(resolve) {
                    return require(['privilege-input'], resolve);
                })
            }
        }
    },
    '/role': {
        component:(function(resolve) {
            return require(['role'], resolve);
        }),
        subRoutes:{
            '/edit/:id':{
                component:(function(resolve) {
                    return require(['role-input'], resolve);
                })
            }
        }
    },
    '/actionlog': {
        component:(function(resolve) {
            return require(['actionlog'], resolve);
        })
    },
    '/notice': {
        name: 'notice',
        component:(function(resolve) {
            return require(['notice'], resolve);
        }),
        subRoutes:{
           '/edit/:id':{
                component:(function(resolve) {
                    return require(['notice-input'], resolve);
                })
            } 
        },
    },
    '/notice/info/:id': {
        component:(function(resolve) {
            return require(['notice-info'], resolve);
        })
    },
    '*':{  //找不到路径跳转404页面
        component:(function(resolve) {
            return require(['404'], resolve);
        })
    }
});
module.exports = {
    route: router    
}

