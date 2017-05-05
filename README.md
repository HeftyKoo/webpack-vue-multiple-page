# webpack-multiple-page

> webpack+vue multiple page. include vux-loader.多页应用webpack+vue脚手架，集成了vux-loader

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 公众库独立打包
本套构建工具可以构建多个vue项目，因此可以将所有项目中用到的公式库（如 vue, vue-router）抽离出来，公共库在`build/webpack.dll.conf.js`中添加，添加完后，运行`npm run build:dll`打包公共库存文件。此命令运行一次即可，如果没有新增或升级库，不需要再打包。

## 添加项目
* 每次新建项目时，在`src`下新建一个文件夹，并以英文字母命名开头命名，如`m`
* 每个项目的入口文件统一命名为`main.js`，并放置到对应项目的根目录下
* 在该构建项目的根目录下新建一个跟项目同名的`html`模板，如`m.html`，需要在模板中加入构建后的公共库`<script type="text/javascript" src="static/js/vendor.dll.js"></script>`
* 在`config/index.js`的配置项`projects`数组中加入对应的项目名

## 别名
项目别名为 `'@' + 项目名的第一个字母（小写）`，如`@m`，在对应的项目中可以像如下方式引入文件`import Hello from '@m/components/Hello'`
对应项目的资源文件别名为`'@' + 项目名的第一个字母（小写） + 'a'`, 如在`<style></style>`中可以以这样的方式引入项目目录`assets`中的文件`@import "@ma/style/variable.less"`

## 样式命名规范
项目采用`less`作为预处理语言，采用`BEM`命名规范

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
