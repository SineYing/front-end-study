# 作业

## 一、简答题

### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程

答：

- 初始化配置文件
- 确定入口文件和输出文件
- 递归依赖树
- 编译模块
- 完成编译并输出
- 完成打包

一般项目中会有各种各样的资源文件，webpack会根据我们配置的入口文件，一般这个文件是一个JavaScript文件。然后根据这个文件中的inport或者require解析出所依赖的资源模块，然后解析每个资源模块所对应的依赖，然后就形成了整个项目中依赖关系的依赖树。webpack会递归这个依赖树，然后找到每个节点对应的资源文件，根据配置的rules属性去找到对应的加载器，然后让这个加载器去加载这个模块，然后把加载后的结果放入output配置的打包结果文件中，从而实现整个项目的打包。整个过程中的loader机制是webpack的核心

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路

答：
对于loader：
主要是专注于实现资源模块的加载。webpack的工作过程类似于一个管道，它的工作过程可以使用多个loader，但最终这个管道的输出结果必须是一段JavaScript代码。所以可以使用一个loader返回JavaScript也可以使用多个loader返回。loader机制是整个webpack的核心。
对于plugin：
主要是增强webpack在项目自动化方面的能力。主要是通过webpack的钩子机制实现。例如：清除dist目录，文件压缩，拷贝静态文件到输出目录等。

Loader开发思路：

- 首先要明确的是每个loader都要导出一个函数,并且可以接收一个source参数，为加载文件的内容，输出为加工后的结果。

  ```js
  module.exports = source => {
      return `${console.log(source)}`
  }
  ```

- 要明确的是每个loader要么输出一段JavaScript代码要么跟其他的加载器一起使用输出一段JavaScript代码。

Plugin开发思路：

- 首先webpack要求plugin必须是一个函数或者是一个包含apply方法的对象，一般都会将插件定义为一个类型，然后在内部定义个apply方法。
- 明确插件的使用时机，确定webpack的钩子
- apply在webpack启动时会被自动调用，apply会接收一个包含此次构建的所有配置信息的compile参数，主要是通过compile对象注册钩子函数（tap方法）

## 二、编程题

### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

先下载任务的基础代码  百度网盘链接: https://pan.baidu.com/s/1pJl4k5KgyhD2xo8FZIms8Q 提取码: zrdd

这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构

有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）

这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

尽可能的使用上所有你了解到的功能和特性

作业要求

本次作业中的编程题要求大家完成相应代码后（二选一）

1.  简单录制一个小视频介绍一下实现思路，并演示一下相关功能。

2.  提交一个项目说明文档，要求思路流程清晰。

最终将录制的视频或说明文档和代码统一提交至作业仓库。

答：
