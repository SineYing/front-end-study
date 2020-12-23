//对象字面量

/*
1.如果变量名与属性名一致，就可省略掉”：“及以后面的变量名

2.如果要给对象添加一个方法,可以省略掉”: function“

3.可以使用表达式的返回值最为对象的属性名,这种特性称为【计算属性名】
*/

/*es2015之前*/
const bar = '234'
// const obj = {
//     foo: '123', bar: bar, baz: '345',
//     methods: function () {

//     },

// }
// //动态添加属性
// obj[Math.random()] = '789'

/*
es2015之后
*/
const obj = {
    foo: '123', bar, baz: '345',
    // 需要注意的是这种是普通的funciton方法，里面的this指向当前对象
    methods() {
        // console.log(this)
    },
    // 【计算属性名】
    [Math.random()]: '789'
}

console.log(obj)
obj.methods()

