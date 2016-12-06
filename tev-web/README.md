
### 目录规范

``` dir
fontEngin
    build 项目生成的所放的文件夹   fis3 release -d build  //将项目编译生成到build文件夹     
    node-modules        //插件列表
    config              //后端服务规则
        conf.json       //配置文件 
    modules             //用require加载的模块插件目录  
    src     
        components      //自定义vue组件目录
        directives      //自定义vue指令目录
        filters         //自定义vue过滤器目录
        pages           //页面目录
    static              //静态资源目录
        img             //公共图片
        js              //公共js
        css             //公共样式
        fonts           //公共字体
        libs            //根据名称进行分类，用到哪些，就添加哪些文件夹、
    test                //测试数据目录
    fis-conf.js         //fis3配置文件
    package.json        //node插件包配置
    manifest.json       //项目资源依赖表
    README.md           //项目说明    
```

# fis3-vue-mod项目脚手架

项目简介：
基于[node](http://nodejs.cn/)、[fis3](http://fis.baidu.com/fis3/docs/beginning/intro.html)、[vue](http://cn.vuejs.org/guide/installation.html)

基本软件安装：
1.[node](http://nodejs.cn/)一直点击下一步下一步就好，安装好以后win+R输入cmd打开命令提示符输入node-v 看node是否 安装成功  测试完成然后输入npm-v，看npm有没有安装成功，一般情况下npm集成在node里面，node安装成功npm也就安装成功了。
2.通过npm安装fis3  在命令行输入npm install -g fis3  或者npm install fis3
加-g表示安装在全局，不加-g只是安装在当前文件夹下，下面默认你已经安装了fis3,参考 [fis3安装](http://fis.baidu.com/fis3/docs/beginning/install.html)

3.安装fis3 常用的插件，安装命令  npm install -g（决定是否全局安装）xxx（插件名）
本项目用到的插件有：fis3-postpackager-loader
                    fis3-hook-commonjs

### start

1. 克隆项目到本地，进入项
目根目录的resore文件下：

2. 开启[fis3前端调试服务器](http://fis.baidu.com/fis3/docs/beginning/debug.html)：

``` bash
fis3 server start
```
    
3. [项目部署预览](http://fis.baidu.com/fis3/docs/beginning/debug.html)：  

``` bash
fis3 release build  -d build//发布模式    将项目发布到build文件夹，可以直接放在服务器
    
fis3 release   //测试模式
```

    
    
### 使用到的fis第三方插件介绍说明：

- [fis3-hook-commonjs](https://github.com/fex-team/fis3-hook-commonjs) 前端模块化插件
- [fis3-postpackager-loader](https://github.com/fex-team/fis3-postpackager-loader) 前端静态资源加载器。
    用来分析页面中使用的和依赖的资源（js或css），并将这些资源做一定的优化后插入页面。




### 使用到的vue插件：
    
- [vue-router](http://vuejs.github.io/vue-router/zh-cn/index.html) Vue.js 官方路由。

###项目启动步骤：
1.下载并安装node  下载地址：https://nodejs.org/en/建议选择长期维护版本
2.安装fis3  在命令行中输入命令：npm install -g fis3  安装完成输入fis3 -v，查看是否安装成功
3.打开fis服务器。命令：fis3 server start
4.进入到项目文件夹的la-web文件夹下,并执行命令：fis3 release -wL
5.打开127.0.0.1:8080即可看到生成后的项目。

###注意事项
/*****************需要模块化的内容****************/
1.每个自己定义组件的js文件，因为需要引入，所以必须模块化。
2.vue-router  vue路由插件
3.vue-validator vue表单验证插件
4.vue 原始插件
5.要通过require引入的js文件

