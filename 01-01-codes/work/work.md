# 模块一：函数式编程与JS异步编程、手写Promise

## 简答题

### 谈谈你是如何理解js异步编程的、EventLoop、消息队列都是做什么的，什么是宏任务、什么是微任务

答：

>异步编程：不会等待这个任务结束才会进行下一个任务，而是开启过后立即执行下一个任务

>优点：更安全更简单

>缺点：耗时任务阻塞执行，会出现假死的情况

>EventLoop：负责监听调用栈和消息队列，一旦调用栈中所有的任务都已结束，消息队列就会取出第一个回调函数压入调用栈

>消息队列：一个JavaScript运行时都会包含一个待处理的消息队列，每一个消息都关联着一个用于处理这个消息的回调函数。当前时刻栈为空时事件循环会从先进入队列的消息开始处理队列中的消息，被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数，包含了参数和局部变量的新帧被压入栈中。函数的处理会一直进行到执行栈再次被清空为止；然后事件循环将会处理队列中的下一个消息。

>微任务：就是直接在当前任务结束后立即执行

>宏任务：是进入到消息队列的末尾执行

## 代码题

### 一、将下面异步代码使用Promise的方式改进

```js
setTimeout(function(){
    var a= 'hello'
    setTimeout(function(){
        var b= 'lagou'
        setTimeout(function(){
            var c = 'I love you'
            console.log(a + b + c)
        },10)
    },10)
},10)
```

答：

```js
//改进
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello ')
    }, 1000)
}).then(a => {
    return { a, b: 'lagou ' }
}).then(({a,b}) => {
    var c = 'I love you'
    console.log(a + b + c)
})
```

### 二、基于以下代码完成下面的四个联系

```js
const fp = require('lodash/fp')
//数据
//horsepower 马力 dollar_value 价格 in_stock库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani HUayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]
```

#### 练习1：使用函数组合fp.flowRight()重新实现下面这个函数

```js
let isLastInStock = function(cars){
    //获取最后一条数据
    let last_car = fp.last(cars)
    //获取最后一条数据的in_stock
    return fp.prop('in_stock',last_car)
}

```

答：

```js
let isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
```

#### 练习2：使用fp.flowRight(),fp.prop(),fp.first()获取第一个car的name

答：

```js
let isFirstName = fp.flowRight(fp.prop('name'),fp.first)
```

#### 练习3：使用帮助函数_average重构averageDollarValue，使用组合函数的方式实现

```js
let _average = function (xs){
    return fp.reduce(fp.add,0,xs)/xs.length
}//<-无需改动

let averageDollarValue = function (cars){
    let dollar_values = fp.map(function(car){
        return car.dollar_value
    },cars)
    return _average(dallor_values)
}

```

答：

```js
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
```

#### 练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeNames(["Hello World"])=>["hello_word"]

```js
let _underscore =fp.replace(/\w+/g,'_')//<-无需改动，并在sanitizeNames中使用它
```

答：

```js
let sanitizeNames = fp.map(car => fp.flowRight(_underscore, fp.toLower)(car.name))
```

### 三、基于下面提供的代码，完成后续的四个练习

```js
//support.js
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(x) {
        return new Maybe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
module.exports = { Maybe, Container }
```

#### 练习1：使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1

```js
//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
    //要实现的函数
}
```

答：

```js
//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./03-support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
    return maybe.map(x => fp.map(a => fp.add(a, 1), x))
}
console.log(ex1())
```

#### 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素

```js
//app.js
const fp = require('lodash/fp')
const {Maybe,Container} = require('./support')
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 =()=>{
    //你要实现的函数
}
```

### 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字首字母

```js
//app.js
const fp = require('lodash/fp')
const{Maybe,Container}=require('./support')
let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x])
})
let user = {id:2,name:'Albert'}
let ex3 = ()=>{
    //需要实现的函数
}
```

答：

```js
//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./03-support')
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    //需要实现的函数
    return safeProp('name', user).map(o => fp.first(o))
}

console.log(ex3())
```

#### 练习4：使用Maybe重写ex4，不要有if语句

```js
//app.js
const fp = require('lodash/fp')
const{Maybe,Container}= require('./support')
let ex4 = function(n){
    if(n){
        return parseInt(n)
    }
}
```

答：

```js
let ex4 = (n) => {
    return Maybe.of(n).map(x => parseInt(n))
}
console.log(ex4(1.9))
```

## 手写实现MyPromise源码

要求：尽可能还原Promise中的每一个API，并通过注释的方式描述思路和原理

```js
/*
2. Promise中有等待、成功、失败三种状态
使用常量的好处
编辑器有代码提示，字符串没有提示
还可以复用
*/
const PENDING = 'pending'//等待
const FULFILLED = 'fulfilled'//成功
const REJECTED = 'rejected'//失败

class MyPromise {
    /*
    1.promise是一个类，要传递一个立即执行的执行器
    */
    constructor(executor) {
        //捕获执行器错误
        try {
            // executor是执行器，且立即执行
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }

    }
    /*
     状态是每个promise对象独有的，状态属性我们要定义成实例属性
     这个状态我们会频繁的使用他，所以我们要给她定义成常量
    */
    //promise状态，默认是等待中
    status = PENDING
    //成功之后的值
    value = undefined
    //失败之后的原因
    reason = undefined
    //成功回调,应该为数组才可以存储多个回调函数
    successCallback = []
    //失败回调
    failCallback = []
    /* 
    resolve和reject是用来改变状态的

    使用箭头函数的原因是：
    直接调用resolve时，这个函数的this指向是window或者是undefined，
    使用箭头函数就会让resolve的this指向实例对象也就是promise对象
    */
    resolve = value => {
        //如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 将状态改为成功
        this.status = FULFILLED
        //保存成功之后的值
        this.value = value
        //判断成功回调是否存在，如果存在则调用
        //this.successCallback && this.successCallback(value)
        while (this.successCallback.length) {
            /*
            shift()是Array的队列方法以先进先出（FIFO）形式访问会删除数组的第一项并返回它，然后原数组长度减一
            使用shift和push可以把数组当成队列来使用
            push是接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度
            
            并执行
            */
            this.successCallback.shift()()
        }
    }
    reject = reason => {
        //如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 将状态改为失败
        this.status = REJECTED
        //保存失败之后的原因
        this.reason = reason
        //判断成功回调是否存在，如果存在则调用
        //this.failCallback && this.failCallback(reason)
        while (this.failCallback.length) this.failCallback.shift()()
    }
    then(successCallback, failCallback) {
        /*4. then方法内部是用来判断状态的，根据成功或失败调用相应的回调函数。
        每个promise都可以调用then方法，所以then方法是被定义在原型对象中的方法
        同一个promise的then方法可以多次被调用，且可以链式调用，后面的then拿到的值是上一个then的返回值
        */



        // 处理链式调用时.then()不传回调函数的情况
        successCallback = successCallback ? successCallback : value => value
        // 发生错误的时候要把错误继续往下传递
        failCallback = failCallback ? failCallback : reason => { throw reason }
        let promise2 = new MyPromise((resolve, reject) => {
            //创建一个执行器，这个执行器是立即执行的，所以下面的状态判断可以直接在此执行
            if (this.status == FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value)
                        /*
                        判断x的值是普通值还是promise对象
                        如果是普通值，应该直接调用resolve
                        如果是promise对象，查看promise对象返回的结果
                        再根据promise对象返回的结果决定调用resolve还是reject
    
                        promise2 在new MyPromise执行完成之后才有，现在是在new MyPromise过程之中
                        所以要变成异步代码 如settimeout，并不是为了延迟，只是为了变成异步代码，所以延迟时间为0
 
                        newPromise 同步代码执行完毕才会进行
                        */
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (e) {
                        reject(e)
                    }

                }, 0)

            } else if (this.status == REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            } else {

                //等待 异步函数开始执行的时候再进行回调，所以要先将successCallback, failCallback进行存储
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (e) {
                            reject(e)
                        }

                    }, 0)
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }
    //不管成功还是失败finally始终都会被执行
    finally(callback) {
        // 因为需要.then链式调用所以返回应该是一个promise对象
        return this.then(value => {
            callback()
            // 为了在下一个then中拿到value所以要返回
            return MyPromise.resolve(callback()).then(() => value)
        }, reason => {
            callback()
            throw MyPromise.resolve(callback()).then(() => { throw reason })
        })

    }
    catch(failCallback){
        // 注册then方法
        this.then(undefined,failCallback)
    }
    // 静态方法

    /*
    允许我们按照异步调用的顺序得到异步代码执行的结果
    接收任何类型的值，包括promise对象，返回值也是promise对象
    全部成功则成功返回结果
    一个失败则失败
    */

    static all(array) {
        let result = []
        let index = 0

        return new MyPromise((resolve, reject) => {
            //为了保证数组的原有顺序
            function addData(key, value) {
                result[key] = value
                index++
                //要等待所有的执行都完成后才能执行resolve
                if (index == array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i]
                if (current instanceof MyPromise) {
                    //promise对象
                    current.then(value => addData(i.value), reason => reject(reason))
                } else {
                    //普通值
                    addData(i, array[i])
                }
            }
        })
    }
    //static静态方法
    /*
    是将返回值转为promise对象，所以在后面的链式调用中才能拿到resolve值
    若为promise对象，则直接返回
    */
    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise((resolve, reject) => resolve(value))
    }

}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        // TypeError类型错误
        //return代码阻止下面的if else向下执行
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}
//node环境
module.exports = MyPromise
```

