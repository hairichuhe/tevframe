fis.match('::packager', {
    //::package 打包的时候启动loader插件 
    //使用说明：默认会把页面中用到的样式插入在 header 中，脚本插入在 body 底部。如果想修改，请在页面自己插入 <!--SCRIPT_PLACEHOLDER--> 和 <!--STYLE_PLACEHOLDER--> 占位符来控制位置。此插件会收集所有的资源，如果希望某个资源不被收集，请在资源结尾处如 </script> 后面加上 <!--ignore--> 注释.
    postpackager: fis.plugin('loader', {
        //sourceMap: true,
        useInlineMap: true
    })
});
fis.set('project.ignore', ['target/**','node_modules/**','doc/**','.*','*.md','pom.xml','fis-conf.js','package.json']);
fis.hook('commonjs');


fis.match('src/({components,directives,filters,modules}/{*,**/*})',{
  useHash: true,
  release:'$1'
});
fis.match('src/({components,directives,filters,modules}/{*.html,**/*.html})',{
  release: false
});
fis.match('src/components/(*.*)',{
  release:'$1'
});
fis.match('src/components/login/(*.*)',{
  release:'$1'
});
fis.match('src/components/error/(*.*)',{
  release:'error/$1'
});
fis.match('**.html', {
  useHash: false,
  useMap: true
});


fis.match('/src/**/(*).js', {
  isMod: true,
  id: '$1'
});


fis.match('/test/server.conf', {
  release: '/config/server.conf'
});

fis.match('/config/conf-dev.json', {
  release: '/config/conf.json'
});

fis.match('/config/conf-prod.json', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
})


/*
 * prod environment  发布环境的配置
 */
fis.media('prod').set('project.ignore',['target/**','node_modules/**','doc/**','.*','*.md','pom.xml','fis-conf.js','package.json','/config/server.conf','test/**','manifest.json']);
//export, module, require不压缩变量名
fis.media('prod').set('settings.optimizer.uglify-js', {
    mangle: {
        except: '$,exports, module, require, define'
    }
});
//自动去除console.log等调试信息
fis.media('prod').set('settings.optimizer.uglify-js', {
    compress : {
        drop_console: true,
        drop_debugger: true
    }
});
// fis.media('prod').match('::package', {
//   // 启用 fis-spriter-csssprites 插件
//   spriter: fis.plugin('csssprites')
// })
fis.media('prod').match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});
fis.media('prod').match('{static/libs/echarts/echarts.min.js, static/libs/bootstrap/**.js, static/libs/pace/**.js, static/libs/ztree/**.js,static/libs/jQuery/FastClick.min.js}',{
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: false
});
fis.media('prod').match('**.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});
fis.media('prod').match('**.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
fis.media('prod').match('/config/conf-prod.json', {
  release: '/config/conf.json'
});
fis.media('prod').match('/config/conf-dev.json', {
  release: false
});
// fis.media('prod').match('*.css', {
//   //  CSS 中，路径带 ?__sprite 的图片进行合并
//   useSprite: true
// });
