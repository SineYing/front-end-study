import { effect } from "../../../../../materials/03-05-Vue.js3.0/code/05-reactivity/reactivity"

const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(tartget) ? reactive(target) : target

/**
 * 判断某个对象本身是否有指定的属性
 * 这里要用到Object原型上的.hasOwnProperty
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(tartget) {
    // tartget如果不是对象直接返回
    if (!isObject(tartget)) return tartget
    //否则把target转换为代理对象
    //捕获器、拦截器 trap
    const handler = {
        get(target, key, receiver) {
            // 收集依赖
            console.log('get', 'key')
            track(target,key)
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
                trigger(target,key)
                console.log('set', key, value)
            }
            return result
        },
        deleteProperty(target, key) {
            /**
             * 首先要判断当前target中是否有自己的key属性
             * 如果有key属性，要判断key从target成功删除后触发更新
             * 返回删除是否成功
             */
            const hadkey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if (hadkey && result) {
                //触发更新
                trigger(target,key)
            }
            return result
        },
    }
    return new Proxy(tartget, handler)
}

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

let targetMap = new WeakMap()
export function track(target, key) {
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

/**
 * 
 */
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

  
  export function computed (getter) {
    const result = ref()
  
    effect(() => (result.value = getter()))
  
    return result
  }