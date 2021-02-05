# Compositon API

> 仅仅是新增的API，依然可以使用options API

## 学习途径

- RFC(Request For Comments)

  > https://github.com/vuejs/rfcs

- Composition API RFC

  > https://v3.vuejs.org/guide/composition-api-introduction.html

## 设计动机

- options API
  - 包含描述组件选项（data、methods、props）的对象
  - options API开发复杂组件时，要将一个功能的逻辑代码拆分到不同选项中，不利于维护

  ```js
  export default{
    data(){
      return {
        position:{
          x:0,
          y:0
        }
      }
    },
    created(){
      window.addEventLisener('mousemove',this.handle)
    },
    destroy(){
      window.removeEventLisener('mousemove',this.handle)
    },
    methods:{
      handle(e){
        this.position.x = e.pageX
        this.position.y = e.pageY
      }
    }
  }
  ```

- Composition API
  - Vue.js3.0新增的一组API
  - 一组基于函数的API
  - 可以更灵活的组织组件的逻辑

```js
import {reactive,onMounted,onUnMounted} from 'vue'
function useMousePosition(){
  const position = reactive({
    x:0,
    y:0
  })
  const update = (e)=>{
    postion.x = e.pageX
    position.y = e.pageY
  }
  onMounted(()=>{
    window.addEventLisener('mousemove',update)
  })
  onUnMounted(()=>{
    window.removeEventLisener('mousemove',update)
  })
  return position
}
export default {
  setup(){
    const position = useMousePosition()
    return {
      position
    }
  }
}
```

## composition API

- createApp函数，用于创建vue对象
- setup函数，是composition API的入口
- reactive函数，是用来创建响应式对象的

```html
<div id="app">
x:{{position.x}}
y:{{position.y}}
</div>
<script type="module">
  import {createApp,reactive} from './node_modules/vue/dist/vue.esm-browser.js'
  /**
  * 1.按需导入createApp，创建一个vue对象，可以接收选项作为参数，也就是一个组件的选项。
  * 跟vue2中给vue构造函数传入的选项一样，可以传入data，methods，computed等选项
  * 2.传入的data不支持对象的形式，必须返回一个函数，统一了data的写法
  * 3.createApp返回一个vue对象
  */
  const app = createApp({
  /** 
  * composition API的入口是setup
  */
  setup(){
  /** 
  * 1.第一个参数是props，用来接收外部传来的参数，并且是个响应式对象，不能被解构
  * 2.第二个参数是context，attrs,emit,slots
  * 3.需要返回一个对象，可以使用在模板、methods、computed，以及生命周期的使用函数中
  * 4.setup使用的时机是在props解析完毕，组件实例创建之前执行，所以setup中无法获取组件的实例
  * 所以setup中无法访问组件的data、methods、computed
  * setup内部的this指向的是undefined
  * 5.reactive将数据转为响应式对象
  */

  const position = reactive({
    x:0,
    y:0
  })
  return {
    position
    }
  },
  mounted() {
    this.position.x = 100
    },
  })
  /** 
  * mount方法类似于vue2.0中的$mount,用于把实例挂载到指定位置
  * app中的成员比vue2中的实例成员要少很多，而且这些成员都没有使用$开头，说明未来基本不用再这个对象上新增成员
  */
  app.mount("#app")
</script>
```

## 生命周期钩子函数

<img src="/Users/sine/Documents/Sine/2020-12-01大前端/front-end-study/03-05-study/note/img/hook.png" style="zoom:33%;" />

> - 在setup中可以使用组件生命周期钩子函数，就是在生命周期钩子函数前面加上on然后首字母大写，例如mounted=>onMounted
> - 因为setup是在beforeCreate和created之间执行的，所以这两个期间执行的函数都可以放在setup中，且不需要再setup中有对应的实现
> - renderTracked和renderTriggered比较类似，都是render函数被重新调用时触发。不同的是renderTracked在render首次调用时也会触发
> - vue2中的destroy钩子函数对应unmounted

## reactive/toRefs/ref

> 都是创建响应式数据的

### reactive

> 是把对象创建为响应式对象，是一个代理对象

```js
const position = reactive({
  x:0,
  y:0
})
```

​		这里的reactive把传入的对象包装成了Proxy对象，当访问position中的x和y时会调用代理对象中的getter拦截收集依赖，当x和y发生变化时会调用setter拦截触发更新

```js
 const {x,y} = useMousePosition()
```

​		当把代理对象结构的时候，就相当于定义了x和y两个变量来接收position.x和position.x。而基本类型的赋值就是把值在内存中复制一份,所以这里的x和y就是两个基本类型的变量，跟代理对象无关。所以当给x和y赋值 的时候无法触发setter，无法进行更新的操作，所以不能对当前的响应式对象进行结构

### toRefs

> 把代理对象中的所有属性都转为相应式对象，toRefs要求传入的对象必须为响应式的，处理对象的属性时类似于ref。
>
> 通过toRefs，可以对代理对象中的属性进行解构的操作

- 可以把响应式对象中的所有属性也转为响应式的对象
- toRefs会创建一个新的对象，然后遍历传入对象的所有属性，把所有属性的值都转换为响应对象，然后挂载到新创建的对象，然后把新创建的对象返回
  - 它内部会给传入对象的每一个属性创建一个value对象，该对象是响应式的。value具有getter和setter，和ref类似。
  - getter中返回代理对象中对应属性的值
  - setter中给代理对象的属性赋值

### ref

> 把普通值转为响应式数据

- 把基本类型数据包装成响应式对象，里面包含value对象。包含getter和setter，在getter中收集依赖，在setter中触发更新

操作基本数据类型的值时要处理它的value对象

```js
function useCount(){
  const count = ref(0)
  const increase=()=>{
    count.value++
  }
  return{
    count,
    increase
  }
}
```



- 在模板中使用时可以省略value

```html
<div id="app">
  <button @click='increase'>按钮</button>
  <span>{{count}}</span>
</div>
```

## computed计算属性

> 用来简化模板中的代码，可以缓存计算的结果，当数据变化后才会重新计算

- 第一种用法

  传入一个获取值的函数，函数内部依赖响应式数据，当依赖的数据发生变化后，会重新获取数据并运行该函数。computed函数返回一个不可变的响应式对象，类似于使用ref创建的对象，只有一个value属性，要去对象的值要通过value属性来获取。模板中使用属性可以省略value

  ```js
  computed(()=>count.value+1)
  ```

- 第二种用法

是传入一个对象，这个对象有getter和setter，返回一个不可变的响应式对象。当访问值的时候会触发getter，当设置值的时候会触发setter

```js
const count = ref(1)
const plusOne = computed({
  get:()=>count.value + 1,
  set:val=>{
    count.value = val-1
  }
})
```