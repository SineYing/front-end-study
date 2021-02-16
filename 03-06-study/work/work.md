# 作业

## 1.说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

答：

两者都是常见的表单数据提交编码类型Content-type的属性，服务端通常以当前属性的值作为消息体的编码方式，对消息体进行解析。

- application/x-www-form-urlencoded是浏览器原生表单提交默认的方式，提交的数据会按照key1=val1&key2=val2的方式进行编码，key和val都进行了url转码。大部分浏览器对这种方式有友好的支持。
- application/json是告诉服务端消息主体是序列化后的json字符串。

## 2.说一说在前端这块，角色管理你是如何设计的。

答：

首先角色分为系统管理员、安全管理员、审计员、业务管理员。要强调的是系统管理员和安全管理员

- 系统管理员：主要用来创建角色、用户、资源、菜单、按钮等
- 安全管理员：用来给角色配置菜单、资源、按钮等，给用户配置角色

## ３.@vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

答：

- 创建项目 由vue init 改成 vue create
- 启动项目 由npm run dev 改成 npm run serve
- @vue/cli移除了配置文件目录 config 和 build 文件夹，如果需要自定义配置，需要自己新建vue.config.js文件
- @vue/cli移除了 static 静态资源文件夹，新增 public 文件夹，静态资源转移到public目录中，通过/xx.xx可以直接访问，并且 index.html 移动到 public 中
- @vue/cli在 src 文件夹中新增了 views 文件夹，用于分类 视图组件 和 公共组件
- @vue/cli安装项目时会自动下载node-modules文件夹

## ４.详细讲一讲生产环境下前端项目的自动化部署的流程。

答：

CI/CD服务使用Github Actions实现

- 将代码提交到github远程仓库
- 在github中的settings->Developer settings->Personal access tokens生成token并复制保存
- 在项目中的settings->Secrets中配置token密钥及服务器相关信息，方便后续.yml文件的使用
- 在.github中创建workflows文件夹，并创建main.yml文件
- 添加版本标签并推向远程服务器

## ５.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

答：

- 接手别人写的代码时，功能全都写到了一个组件里，很难对代码进行重新梳理
出现这种情况时就要在保持原有功能的基础上，将新的功能进行抽离编写，同时与相关人员商讨在代码规范里添加相应的组件抽离规范。
- 在功能业务开发中表单代码的重复度比较高
本来想自己着手将表单组件进行封装，在访问技术文档的过程中遇到了formrender解决方案，很好的解决了现有的问题，可以通过JSON快速实现表单的显示

## ６.针对新技术，你是如何过渡到项目中？

答：

> 在原有项目中使用新技术，首先要保证原有功能的稳定性，其次要保证新技术的稳定运维及社区活跃情况。例如：ts、formrender等