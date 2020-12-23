//对象解构
/*
根据属性名提取
*/
const obj = { name: 'qwe', age: 18 }
const { name, age } = obj
console.log(name)

/*
重命名的方式,并设置默认值的方式
*/
const { name: ObjName = 'asd' } = obj
console.log(ObjName)

/*
简化代码编写，减小代码体积
*/
const { log } = console
log(1)
log(2)
log(4)
log(5)