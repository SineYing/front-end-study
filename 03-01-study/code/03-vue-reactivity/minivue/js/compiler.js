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