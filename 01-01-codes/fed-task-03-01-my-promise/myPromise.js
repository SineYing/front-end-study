/*
使用常量的好处
编辑器有代码提示，字符串没有提示
还可以复用
*/
const PENDING = 'pending'//等待
const FULFILLED = 'fulfilled'//成功
const REJECTED = 'rejected'//失败

class MyPromise {
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
    //
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