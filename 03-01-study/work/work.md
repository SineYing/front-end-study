# 作业

## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

答：
点击按钮的时候动态给 data 增加的成员，不是响应式数据
可以通过Vue.set()新增响应式属性

> data对象中的属性是在new Vue初始化的时候转换的getter和setter，所以动态添加的时候没有触发getter和setter的转换，vue官方文档提到Vue不允许动态添加根级别的响应式属性。可以使用Vue.set()/vm.$set()方法向嵌套对象添加响应式属性
> Vue.se的内部原理是调用Object.defineProperty将新增属性转换成getter和setter

### 2、请简述 Diff 算法的执行过程

答：
    就是用来找两个节点之间的差异

    虚拟DOM，DOM操作会引起DOM的重拍和重绘，Diff的核心是当数据变化后不直接操作DOM，而是用JS对象来描述真实DOM，当数据变化后先比较JS对象是否发生变化，找出变化后的位置，然后只是最小化的更新变化后的位置，从而提高性能，diff是一种算法。

    - 查找两棵树的每一个节点
    - 只比较同级别的节点，如果同级别不相同直接删除

    ### 执行过程

    首先对新老数组的开始和结尾设置一个索引，在遍历的过程中移动相应的索引，在对开始和结束节点比较的时候总共有四种情况

    - oldStartVnode/newStartVnode(旧开始节点/新开始节点)
    - oldEndVnode/newEndVnode(旧结束节点/新结束节点)
    - oldStartVnode/newEndVnode(旧开始节点/新结束节点)
    - oldEndVnode/newVnode(旧开始节点/新开始节点)

    开始和结束节点（新开始节点和旧开始节点、新结束节点和旧结束节点）

    - 如果旧开始节点是sameVnode（key和sel相同）

      - 调用patchVnode()对比和更新节点

      - 把旧开始和新开始索引往后移动oldStartIdx++/oldEndIdx++，把后面的节点作为开始节点进行比较

      - 如果新开始节点和旧开始节点不是sameVnode，开始调用patchVnode()比较新结束节点和旧结束节点

      - 如果相同索引往后移动oldStartIdx--/oldEndIdx--，

        > 注意：如果两个节点是sameVnode的话会重用之前的DOM元素，在patchVnode中会对比新旧元素的差异，把差异更新到重用的DOM元素上，这个差异可能是文本内容不同或者子元素不同，这个DOM是不需要重新创建的，如果文本内容或子元素都相同是不会进行DOM操作的，虚拟DOM是通过这种方式提高性能的

    ![新旧开始节点比较](./img/diff.png)

    - 比较旧开始节点和新结束节点

      - 使用sameVnode比较两个节点是否为相同节点，如果相同调用patchVnode()对比和更新节点
      - 因为oldStartVnode和newEndVnode相同，把oldStartVnode对应的DOM元素，移动到右边，更新索引，旧开始的索引移动到下一个位置，新结束索引往前移动

      ![旧开始节点和新结束节点](./img/diff2.png)

    - 旧开始节点和新结束节点

      - 使用sameVnode比较两个节点是否为相同节点，如果相同调用patchVnode()对比和更新节点
      - 因为oldEndVnode和newStartVnode相同，把oldEndVnode移动到最前面更新索引

      ![旧开始节点和新结束节点](./img/diff3.png)

    - 非以上四种情况

    > 以上情况都不满足说明开始和结束节点都不相同，这个时候在旧节点中一次查找是否有新节点。首先遍历新的开始节点，在旧的数组中查找是否有相同key值的节点，
    >
    > 没有找到说明新的开始节点是一个新的节点，那表明需要创建DOM元素并把它插入到开始的位置
    >
    > 如果找到了相同key值的元素，并且sel也相同说明是相同节点，找到的这个旧节点会被赋值到elmTomove这个变量，然后调用patchVnode对比和更新这两个节点内部的差异，然后再把elmToMove节点对应的DOM元素移动到最前面

    ### 循环结束

    - 当老节点的所有子节点先遍历完（oldStarIdx>oldEndIndx），循环结束

      - 说明新节点有剩余，会调用addVnode()把剩余节点批量插入右边，这种情况下旧开始的索引大于旧结束节点的索引

      ![新节点有剩余](./img/diff4.png)

    - 当新节点的所有子节点先遍历完（newStarIdx>newEndIndx），循环结束

      - 说明老节点有剩余，把剩余节点批量删除，这种情况下新开始索引大于新结束索引

      ![老节点有剩余](./img/diff5.png)

## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化

答:

```js
let _Vue = null

export default class VueRouter {
    // install 接收两个参数，一个是Vue构造函数，一个是可选选项对象
    static install(Vue) {
        //- 判断插件是否是已经被安装
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true
        //- 把Vue构造函数记录到全局变量中，vue实例方法中要用到Vue的构造函数，例如：使用功能vue.conponent创建router-link等组件
        _Vue = Vue
        //- 把创建实例时传入的router对象注入到所有vue实例上，$router就是在这里注入的，所有的组件也都是vue的实例
        /**
         * 混入
         * 所有的实例包括组件都会去执行这个钩子函数
         * 给所有的实例设置一个选项
         */
        _Vue.mixin({
            // 所有的组件都有一个beforeCreate钩子，所以会被执行很多次
            beforeCreate() {
                // 所以要判断一下实例中的this.$options中是否有router属性
                // 如果不是组件
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    // 先找到router对象，再调用对象的init方法
                    this.$options.router.init()
                }

            },
        })
    }
    constructor(options) {
        this.options = options
        this.routeMap = {}
        //Vue.observable用于创建响应式对象,可以直接用在渲染函数或者计算属性里面
        this.data = _Vue.observable({
            current: options.mode || options.mode == 'hash' ? window.location.hash.replace("#", "") : '/'
        })
    }

    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    createRouteMap() {
        //遍历所有的路有规则，把路由规则以键值对的方式存储到routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents(Vue) {
        const self = this
        // 传递这个Vue参数的目的是减少和外部的依赖，最终是要创建一个超链接
        /**
         * 使用Vue.component创建组件
         * props用于接收参数
         * slot是插槽
         */
        Vue.component('router-link', {
            props: {
                to: String
            },
            // template: '<a :href="to"><slot></slot></a>'
            render(h) {
                /**
                 * 完整版本的vue中有编译器，可以将template转换为render函数
                 * 在运行时版本中没有编译器，我们直接来写render函数
                 * render函数一般会接受一个h函数，来帮我们创建虚拟DOM，然后返回这个h函数
                 */
                // 渲染函数
                /**
                 * 接收三个参数
                 * 选择器：标签
                 * 属性
                 * 标签里的内容
                 */
                return h('a', {
                    attrs: {
                        href: this.to//表示标签的href属性接收this.to的值
                    },
                    on: {
                        click: this.clickHandler
                    }
                },
                    //可能包括很多内容所以用数组展示
                    //使用this.$slots.default获取默认插槽的内容
                    [this.$slots.default])
            },
            methods: {
                clickHandler(e) {
                    // 如果是hash状态改变地址栏
                    window.location.hash = this.to;
                    e.preventDefault();
                }
            },
        })

        //创建router-view
        Vue.component('router-view', {
            render(h) {
                // 获取当前路由地址对应的组件
                const componnet = self.routeMap[self.data.current]
                //h函数用于返回虚拟DOM，h函数可以直接把组件返回成虚拟DOM
                return h(componnet)
            }
        })
    }

    initEvent() {
        window.addEventListener('popstate', () => {
            //因为使用了箭头函数，所以这里的this指向的是initEvent中的箭头函数也就是VueRouter
            // 将 # 后的路径赋值给currentPath
            this.data.current = window.location.hash.slice(1)
        })
    }
}
```

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

答:

```js
class Compiler {
  constructor(vm) {
    //为了给el和vm赋值，所以要传入vm实例
    this.el = vm.$el
    this.vm = vm
    /**
     * 
     */
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      // let attrName = attr.name
      // if (this.isDirective(attrName)) {
      //   // v-text --> text
      //   attrName = attrName.substr(2)
      //   let key = attr.value
      //   this.update(node, key, attrName)
      // }
      let attrName = this.directiveType(attr.name)
      let key = attr.value
      if (typeof attrName !== 'object') {
        this.update(node, key, attrName)
      } else {
        this.updateBindOn(key, attrName)
      }
    })
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  //用与bind和on的方法获取
  updateBindOn(key, attrName) {
    let updateFn = this[attrName.type + 'Updater']
    updateFn && updateFn.call(this, attrName,key)
  }
  
  // 处理 v-text 指令
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  // v-model
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // v-html
  htmlUpdater(node, value, key) {
    //官方文档有提到v-html是更新元素的innerHTML
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }
  // v-on
  onUpdater(obj, key) {
    // obj包含事件name是click mouseover等
    // 获取实例中methods中的相应方法
    let name = this.vm.$methods[key.indexOf('(') > -1 ? key.split('(')[0] : key]
    let arg = key.match(/\((\S*)\)/)[1]
    // 这里只模拟了click事件
    switch (obj.name) {
      case 'click':
        document.addEventListener('click', () => {
          name(...arg.split(','))
        })
    }
  }
  // 编译文本节点，处理差值表达式
  compileText(node) {
    // console.dir(node)
    // {{  msg }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象，当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断元素属性是否是指令，如果是返回指令名称v-text=>text，否返回false
  directiveType(attrName) {
    /**
     * 1.首先要判断是否为指令，否返回false
     * 2.判断是否为bind指令，返回{'bind:'src'}
     * 3.判断是否为on指令，返回{'on':'click'}
     * 4.是返回text
     */
    if (attrName.startsWith('v-')) {
      let name = attrName.split(':')[1]
      if (attrName.indexOf('bind:') > -1 || attrName.startsWith(':')) {
        return { type: 'bind', name }
      } else if (attrName.indexOf('on:') > -1 || attrName.startsWith('@')) {
        return { type: 'on', name: name ? name : attrName.split('@')[1] }
      }
      // v-text --> text
      return attrName.substr(2)
    }
    return false

  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
```

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

![work](./img/work.png)

答：
项目地址为https://github.com/SineYing/front-end-study/tree/main/03-01-study/work/snabbdom-work