/*Array.from()
用于将类数组结构转换为数组实例
*/
console.log(Array.from('12345'));

//对数组进行浅复制
const a1 = [1, 4, 5, 7]
const a2 = Array.from(a1)
console.log(a2)//[1,4,5,7]
console.log(a1 == a2)//false

//可以使用任务可迭代对象

//arguments可以轻松的被转为数组

function getArgsArray() {
    return Array.from(arguments)
}
console.log(getArgsArray(1, 3, 4, 5))//[ 1, 3, 4, 5 ]

//也可用of来实现,用来替换es6之前常用的Array.prototype.slice.call(arguments)这种将参数转为数组的写法
console.log(Array.of(1, 3, 4, 5))//[ 1, 3, 4, 5 ]

//from也能转换带有必要属性的自定义对象
const arrayLikeObject = {
    0: 1,
    1: 5,
    2: 7,
    1: 0,
    'length': 6
}
console.log(Array.from(arrayLikeObject))
/*[ 1, 0, 7, undefined, undefined, undefined ]*/

//from()还可以接受第二个可选的映射函数参数，这个函数可以增强新数组的值，还可以接受第三个可选参数，用于指定映射函数中的this，但这个重写的this值在箭头函数中不适应
const b1 = [1, 2, 4, 5]
const b2 = Array.from(b1, x => x ** 2)
const b3 = Array.from(b1, function (x) {
    return x ** this.exponent
}, {
    exponent: 2
})

console.log(b2)//[ 1, 4, 16, 25 ]

console.log(b3)//[ 1, 4, 16, 25 ]