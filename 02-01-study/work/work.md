# 作业

## 简答题

1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

答：

- 想要使用Es6+新特性，但是执行环境会不兼容
- 想要使用Less/Sass等css预处理语言，执行环境不能识别
- 上线之前要手动压缩js、css、图片、字体等静态资源，重复操作且容易出错
- 多人协同开发，代码风格不同意

2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

答：脚手架创建项目结构只是它其中的一个作用，还提供项目规范和约定

- 提供相同的开发范式

- 相同的模块依赖

- 相同的工具配置

- 以及相同的基础代码

  避免了重复性的环境配置及文件拷贝工作

## 编程题

1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

答：这里主要简述脚手架的实现过程

- 首先创建一个目录通过yarn init进行初始化
- 在package.json中添加bin字段指定cli的入口文件
- 创建cli.js并在cli.js中添加文件头\#!/usr/bin/env node
- 通过chmod 755 cli.js实现读写权限的修改（macOS环境）
- 通过yarn add inquirer添加依赖，发起命令行交互询问
- 在项目目录下添加temp文件夹放入项目模板，模板里在相应的地方用<%= XXX %>添加询问内容
- 通过fs读取文件,并通过ejs模板引擎将通过inquirer拿到询问结果输出到目标目录

项目地址为：https://github.com/SineYing/front-end-study/tree/main/02-01-study/work/scoffoldWork

2、尝试使用 Gulp 完成项目的自动化构建

项目基础代码下载地址：

百度网盘：https://pan.baidu.com/s/1AyGApMTFEfCeGfQBdykOGg 提取码: bw3r

说明：
本次作业中的编程题要求大家完成相应代码后（二选一）

- 1. 简单录制一个小视频介绍一下实现思路，并演示一下相关功能。

- 2. 提交一个项目说明文档，要求思路流程清晰。

说明文档和代码统一提交至作业仓库

答：

项目地址为：https://github.com/SineYing/front-end-study/tree/main/02-01-study/work/pages-boilerplate

说明文档地址：https://github.com/SineYing/front-end-study/blob/main/02-01-study/work/pages-boilerplate/infomation.md
