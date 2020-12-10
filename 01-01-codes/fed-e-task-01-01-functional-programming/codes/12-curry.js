//模拟实现lodash中的curry方法
const _ = require('lodash')
function getSum(a,b,c) {
  return a + b + c
}

/*
调用_.curry时我们要传入一个纯函数
返回一个柯里化后的函数
*/
// const curied = _.curry(getSum)
const curied = curry(getSum)

console.log(curied(1,2,3))
console.log(curied(1,2)(3))
console.log(curied(1)(2)(3))

//需要一个经过柯里化处理的函数
function curry(fn){
  return function curriedFn(...args){
    //第一种情况就是这个柯里化函数需要几个函数我们就传入几个函数
    //第二种，调用curry函数时只传入部分参数，返回一个等待接收其他参数的函数
    //我们要获取一下形参的个数是否与fn实参的个数
    if(args.length<fn.length){
      return function(){
        // arguments是伪数组所以要用Array.from进行处理
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }else{
      return fn(...args)
    }

  }

}