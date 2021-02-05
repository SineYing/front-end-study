# Vite

> vue3.0的构建工具，源于法语，是“快”的意思

## ES Module

- 现代浏览器都支持ES Module（IE不支持）

- 通过下面的方式加载模块

  - <script type="module" src = "..."></script>

- 支持模块的script默认延迟加载

  - 类似于script标签设置defer
  - 在文档解析完成后，触发DOMContentLoaded事件前执行

## Vite as Vue-CLI

### 运行阶段

- Vite在开发模式下不需要打包可以直接运行

  > 在开发模式下，Vite使用原生ES-Moudle加载模块，也就是通过import导入模块。因为Vite不需要打包代码，所以开发模式下是秒开，而Vue-CLI在开发模式下需要先打包整个项目。
  >
  > Vue会开启一个测试服务器，拦截浏览器发送的请求，浏览器会向服务器发起请求获取相应的模块，Vite会对浏览器不识别的模块进行处理。例如：import 一个.vue文件，Vite会对文件进行编译，然后将编译结果返回给浏览器,并将相应头中的Content-Type设置为application/JavaScript，目的是告诉浏览器正在发送一个JavaScript脚本

  有点：

  - 快速冷启动
  - 按需编译
  - 模块热更新，性能与模块总数无关

- Vue-CLI开发模式下必须对项目打包才可以运行

### 打包

- Vite在生产环境下使用Rollup打包
  - 基于ES Module的方式打包，打包提交比较小
- Vue-CLI使用Webpack打包

## Vite创建项目

- Vite创建项目

```shell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

- Vite基于模板创建项目

```shell
npm init vite-app --template react
npm init vite-app --template preact
```

> Vite的工作原理
> 它使用ES-Module的方式来加载模块，在开发环境下它不会打包项目，把所有模块的请求都交给服务器来处理，在服务器去处理浏览器不能识别的模块。如果是单文件组件会调用compiler-ffc编译单文件组件，并把编译的结果返回给浏览器。