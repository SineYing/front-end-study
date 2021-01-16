# Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

## 一、简答题

### 1、请简述 Vue 首次渲染的过程

答：

- Vue初始化实例成员(instance)和静态成员(initGlabalAPI)
- 调用new Vue构造函数
- 在构造函数中调用了this._init(),这是Vue的入口
- 在this._init()中调用了vm.$mount（完整版）
  - 判断有没有传入render，如果没有获取tempalte，如果也没有会把el中的内容作为模板
  - 然后通过compileToFunctions把模板编译成render函数
  - 将编译完成的render存入到opitons.render中
- 然后调用运行时的vm.$mount会重新获取el，因为运行时版本中不能运行template，$mount中返回mountComponent()
- mountComponent中的作用有
  - 判断是否有render选项，如果没有但是传入了模板，并且当前是开发环境的话会发送警告，告诉我们运行时不支持模板编译器
  - 触发beforeMount
  - 定义updateComponent
    - 返回vm._update(vm._render())
    - vm._render()渲染虚拟DOM
    - vm._update更新，将虚拟DOM转换成真实DOM,并挂载到页面
  - 创建Watcher实例
    - 传入updateCompinent
    - 触发Watcher的get方法，入栈并将当前watcher赋值给Dep.target
  - 触发mounted
  - 返回实例
- watcher.get()
  - 创建完watcher会调用一次get
  - 调用updateComponent()
  - 调用vm._render()创建VNode
    - 调用render.call(vm._renderProxy,vm.$createElement)
    - 调用实例化时Vue传入的render()
    - 或者编译tenplate生成的render()
    - 返回VNode
  - 调用vm._update()
    - 调用vm.__patch__(vm.$el,vnode)挂载真实DOM
    - 记录vm.$el

### 2、请简述 Vue 响应式原理。

答：

- 在生成Vue实例时对传入的data调用observe方法进行响应式处理
- 在observe函数中判断对象是否有__ob__，如果没有创建通过Observe类创建observe对象
- 在Observe类中通过arrayMethods补充数组的'push','pop','shift','unshift','splice','sort', 'reverse'方法。调用walk方法进行遍历，使用Object.defineProperty把这些属性转为getter/setter，
- Object.defineProperty是ES5中一个无法shim的特性，所以Vue不支持IE8及以下版本浏览器
- 每一个vue实例都有一个watcher实例，它会在实例渲染时收集这些属性，用于setter时发送通知进行重新渲染

### 3、请简述虚拟 DOM 中 Key 的作用和好处

答：

key在虚拟DOM中的作用和好处是

- 在判断新旧VNode时，即调用sameVnode函数时设置key后能更快读的判断出两个VNode的不同

### 4、请简述 Vue 中模板编译的过程

- 在完整版的Vue中调用compileToFunctions，把template转换成render函数，是模板编译的入口
- 在createCompileToFunctionFn中返回compileToFunctions，
  - 从缓存中加载编译好的render函数，
  - 如果没有调用compile(),把模板编译为编译对象(render, staticRenderFns)，字符串形式的js代码
  - 调用createFunction把字符串形式的js代码转换成js方法
  - 缓存并返回res对象(render, staticRenderFns方法)

关键函数解释：

- compile函数合并了options选项，调用baseCompile进行编译，并记录错误
- baseComfile中首先是调用parse把模板转换为抽象语法树，然后是调用optimize优化语法树，最后是调用generate把抽象语法树生成字符串形式的js代码
- parse()依次遍历HTML模板字符串，把HTML模板字符串转换为AST对象，也就是一个普通对象，HTML的属性和指令都会记录在AST对象的相应属性上
- optimize()
  - 用来优化抽象语法树中的静态节点，静态节点就是静态的DOM子树，永远不会发生变化，当标记完成静态子树后将来就不需要重新去渲染，patch的时候就可以直接跳过静态子树
  - 用来标记静态根节点，指的是标签中包含子标签，并且没有动态内容，也就是里面都是纯文本内容，这种情况Vue不会对它进行优化，因为这种优化成本大于收益
