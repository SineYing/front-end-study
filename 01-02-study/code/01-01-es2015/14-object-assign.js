//对象扩展方法
/*
Object.assign 可以将多个源对象中的属性复制到一个目标对象中，如果有相同属性源对象中的属性就会覆盖掉目标对象中的属性
*/

const source1 = {
    a: 123,
    b: 345
}
const source2 = {
    b: 345,
    d: 298,
}
const target = {
    a: 567,
    c: 897
}
/* 
用后面对象的属性去覆盖第一个对象,且返回值为第一个对象

如果传递了2个以上的对象，就是除第一个外的对象复制到第一个对象中
*/
const result = Object.assign(target, source1, source2)
console.log(target)
console.log(target === result)

// 我们常用来复制一个对象

function func(obj) {
    // 如果我们在函数内部改变了函数的属性，那外部的对象也会发生变化，因为他们指向同一个内存地址

    // obj.name = 'func obj'
    // console.log(obj)

    //如果只是想在函数内部改变这个对象的属性，可以使用Object.assign方法把他们复制到一个全新的对象中
    const funcObg = Object.assign({}, obj)
    funcObg.name = 'func obj'
    console.log(funcObg,'funcObg')
}

const obj = { name: 'global obj' }
func(obj)
console.log(obj,'obj')