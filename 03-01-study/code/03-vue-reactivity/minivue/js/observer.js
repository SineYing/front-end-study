class Observer {
  constructor(data) {
    /*希望通过这个类创建完对象之后，能够立即
    把data中的对象转换成getter和setter，
    所以在constructor中调用walk方法
    */
    this.walk(data)
  }
  walk(data) {
    // 1. 判断data是否是对象，保持代码的健壮性
    if (!data || typeof data !== 'object') {
      return
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    let that = this
    // 负责收集依赖，并发送通知
    let dep = new Dep()
    // 如果val是对象，把val内部的属性转换成响应式数据
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      /**
       * obj就是$data,$data中引用了这里的get方法，get又引用了val，这里就触发了闭包，所以val没有被释放掉
       */
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        //如果这里不传入val而是直接使用data[key]
        //每次调用data[key]就会触发get，就陷入了死递归
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        //新增对象中的属性也转换成getter和setter
        that.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}