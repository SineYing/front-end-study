# 3-5作业

## 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

答：

- 使用Proxy处理响应式数据

  - 可以监听动态新增的属性，vue2.0中需要调用vue.set()进行处理
  - 可以监听删除的属性，vue2.0监听不到属性的删除
  - 可以监听数组的索引和length属性，vue2.0监听不到这两个属性的操作
  
  > 使用Proxy提升了响应式的性能和功能

- 编译优化
  > 通过优化编译过程和重写虚拟DOM让首次渲染和更新的性能有了大幅度提升

  vue3中标记和提升所有的静态节点，diff时只需要对比动态节点内容
  - 新引入Fragments（片段）特性，模板中不需要再创建一个唯一的根节点，模板里可以直接放文本内容或者很多同级的标签
  - 静态提升，静态节点都会被提升到render 的外部，只有初始化时会被创建，再次调用render时不会再次创建，可以直接重用这些静态节点对应的vnode
  - Patch flag
  - 缓存事件处理函数减少了不必要的更新操作
  
- 源码体积优化
  - Vue3中移除了一些不常用的API
  - 例如：inline-template、filter等可以让最终代码的体积变小
  对Tree-shaking支持更好，Tree-shaking依赖Es-module，也就是export import。通过编辑阶段的静态分析找到没有引入的模块在打包时直接过滤掉，让打包后的体积更小。

## 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

答：

- options API
  - 包含描述组件选项（data、methods、props）的对象
  - options API开发复杂组件时，要将一个功能的逻辑代码拆分到不同选项中，不利于维护
- Composition API
  - 一组基于函数的API
  - 可以更灵活的组织组件的逻辑

## 3、Proxy 相对于 Object.defineProperty 有哪些优点？

答：

Es6后新增的Proxy对象，本身性能就比defineProperty要好。另外代理对象可以拦截属性的访问、赋值、删除等操作，不需要初始化时遍历所有的属性。另外多层嵌套属性只有在访问时才会递归处理下一层属性。

## 4、Vue 3.0 在编译方面有哪些优化？

答：
vue3中标记和提升所有的静态节点，diff时只需要对比动态节点内容

- 新引入Fragments（片段）特性，模板中不需要再创建一个唯一的根节点，模板里可以直接放文本内容或者很多同级的标签
- 静态提升，静态节点都会被提升到render 的外部，只有初始化时会被创建，再次调用render时不会再次创建，可以直接重用这些静态节点对应的vnode
- Patch flag
- 缓存事件处理函数减少了不必要的更新操作

## 5、Vue.js 3.0 响应式系统的实现原理

答：

## Proxy对象

- set和deleteProperty中需要返回布尔类型的值，在严格模式下，如果返回false的话会出现Type Error

> Reflect是反射的意思，在代码运行期间用来获取或者设置运行中的成员。
> 过去比较随意的把一些方法挂载到Object中，例如：Object.getProperty(),Reflect中也有对应的方法Reflect.getProperty()，方法的作用是一样的，如果在Reflect中有对应的方法，建议使用Reflect中的方法

```js
'use strict'
const target={
  foo:'xxxx',
  bar:'yyyy'
}
const proxy = new Proxy(target,{
  get(target,key,receiver){
    return Reflect.get(...arguments)
  },
  set(target,key,receiver){
    return Reflect.get(...arguments)
  },
  deleteProperty(target,key){
    return Reflect.get(...arguments)
  },
})
proxy.foo='zzs'
```

- Proxy和Reflect中使用的reaciver。Proxy中reciver是Proxy对象或者继承Proxy的对象。Reflect中的reciver：如果target对象中设置了getter，getter中的this指向reciver

```js
const obj = {
  get foo(){
    console.log(this)
    return this.bar
  }
}
const proxy =new Proxy(obg,{
  get(target,key,reciver){
    if(key == 'bar'){
      return 'value-bar'
    }
    return Reflect.get(target,key)
  }
})
console.log(proxy.foo)
```

## reactive功能

- 接收一个参数，判断这个参数是否是对象

> reactive只能将对象转换成响应式对象，这是和ref不同的地方

- 创建拦截器对象handler，设置get/set/deleteProperty
- 返回Proxy对象

```js
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(tartget) ? reactive(target) : target

/**
 * 判断某个对象本身是否有指定的属性
 * 这里要用到Object原型上的.hasOwnProperty
 */
const hasOwnProperty= Object.prototype.hasOwnProperty
const hasOwn = (target,key)=>hasOwnProperty.call(target,key)

export function reactive(tartget) {
    // tartget如果不是对象直接返回
    if (!isObject(tartget)) return tartget
    //否则把target转换为代理对象
    //捕获器、拦截器 trap
    const handler = {
        get(target, key, receiver) {
            // 收集依赖
            console.log('get', 'key')
            /** 
             * 返回target中对应的key的值
             * 如果key的值是对象的话，要在getter中递归收集下一级的依赖，还需要将里面的所有属性转换为响应式
             */
            const result = Reflect.get(target, key, receiver)
            return convert(result)
        },
        set(target, key, value, receiver) {
            const oldValue = Reflect.get(target, key, receiver)
            let result = true
            if (oldValue !== value) {
                result = Reflect.set(target, key, value, receiver)
                console.log('set',key,value)
            }
            return result
        },
        deleteProperty(target, key) {
            /**
             * 首先要判断当前target中是否有自己的key属性
             * 如果有key属性，要判断key从target成功删除后触发更新
             * 返回删除是否成功
             */
            const hadkey = hasOwn(target,key)
            const result = Reflect.deleteProperty(target, key)
            if(hadkey&& result){
                //触发更新
                console.log('delete',key)
            }
            return result
        },
    }
    return new Proxy(tartget, handler)
}
```

## 收集依赖

```js
const product = reactive({
      name: 'iPhone',
      price: 5000,
      count: 3
})
let total = 0 
/** 
* 首次加载首先会执行effect中的箭头函数
* 在箭头函数中又访问了product，product是一个reactive处理过的响应式对象，也就是代理对象
* 当访问product.price时会访问product.price的get方法，在get方法中要收集依赖，收集依赖的过程就是存储这个属性和回调函数
* 属性又和对象相关，所以在代理对象的get方法中首先会存储target目标对象，然后是target对象的属性price，然后把对应的箭头函数存储起来。这里是有对应关系的，目标对象、对应的属性以及对应的箭头函数。
* 在触发更新的时候再根据这个属性找到对应的函数
*/
effect(() => {
  total = product.price * product.count
})
console.log(total)

product.price = 4000
console.log(total)

product.count = 1
console.log(total)
```

![](/Users/sine/Documents/Sine/2020-12-01大前端/front-end-study/03-05-study/note/img/收集依赖.png)

在依赖收集的过程中会创建三个集合：

- targetMap

> new WeakMap()，targetMap的作用是用来记录目标对象和一个字典也就是目标对象的属性，使用的是弱引用的Map,也就是存储的key是对象，因为是弱引用，当目标失去引用后目标会销毁。targetMap的值是depsMap

- depsMap

> new Map()，是一个字典，key是目标对象的属性名称，值是一个set集合，set集合中存储的元素不会重复

- dep

> new Set()，里面存储的是effect函数，因为可以多次调用一个effect，并在effect中访问同一个属性，所以该属性会收集多次依赖对应多个effect函数

通过这种结构可以存储目标对象、目标对象的属性以及effect函数。一个属性可能对应多个函数。将来触发更新的时候可以根据目标对象的属性找到effect函数然后执行。

### effect函数的实现

```js
let activeEffect = null
export function effect(callback) {
    // activeEffect用来记录callback
    activeEffect = callback
    /**
     * 调用effect函数后会先执行一次callback
     * 访问响应式对象属性，去收集依赖
     */
    callback()
    // 收集完依赖要置空
    activeEffect = null
}
```

### track函数实现

```js

let targetMap = new WeakMap()
export function track(target, key) {
  /** 
  * 收集依赖的track函数，首先要通过targetMap属性找到depsMap，
  * 如果没有找到要给当前对象创建一个depsMap并添加到targetMap中，
  * 如果找到了再根据当前的属性在depsMap中找到对应的dep。
  * dep里存储的是effect函数，没有找到的话为当前属性创建对应的map并且存储到depsMap中。
  * 如果找到当前属性对应的集合，则将当前的effect函数存储到相应的dep中。
  */
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
}
```

### trigger实现

```js
export function trigger (target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const dep = depsMap.get(key)
    if (dep) {
        // 遍历所有的effec函数然后挨个执行
      dep.forEach(effect => {
        effect()
      })
    }
  }
```

### ref

```js
export function ref (raw) {
    // 判断 raw 是否是ref 创建的对象，如果是的话直接返回
    if (isObject(raw) && raw.__v_isRef) {
      return
    }
    let value = convert(raw)
    const r = {
        // 创建标识属性，标识是ref创建的对象
      __v_isRef: true,
      get value () {
        //   调用track收集依赖
        track(r, 'value')
        return value
      },
      set value (newValue) {
          //判断新旧值是否相等
        if (newValue !== value) {
          raw = newValue
          value = convert(raw)
          trigger(r, 'value')
        }
      }
    }
    return r
  }
```

### reactive Vs ref

- ref可以把基本数据类型数据转成响应式对象，当获取数据时要使用.value属性，模板中可以省略value属性。reactive不能将基本数据类型转为响应式对象
- ref返回的对象，重新给value赋值后也是响应式的
- reactive返回的对象重新赋值丢失响应式，因为重新赋值的对象不再是代理对象
- reactive犯规的对象不可以结构,如果想要结构的话通过toRefs处理为响应式对象

### toRefs

```js
/**
   * 首先判断接收的参数是否是一个reactive创建的对象，入股不是的话发送警告
   */
  export function toRefs (proxy) {
    const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  
    for (const key in proxy) {
      ret[key] = toProxyRef(proxy, key)
    }
  
    return ret
  }

//   将每一个属性转换为ref返回的对象
  function toProxyRef (proxy, key) {
    const r = {
      __v_isRef: true,
      get value () {
        return proxy[key]
      },
      set value (newValue) {
        proxy[key] = newValue
      }
    }
    return r
  }
```

### computed

> computed函数内部会通过effect监听getter内部响应式属性的变化，因为effect中执行getter的时候，访问数据的属性会去收集依赖，当数据变化后会重新执行effect函数，把getter结果再存储到result中

```js
  export function computed (getter) {
    const result = ref()
  
    effect(() => (result.value = getter()))
  
    return result
  }
```