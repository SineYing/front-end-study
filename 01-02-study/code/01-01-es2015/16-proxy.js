//proxy 监视某个对象的读写过程

/*
我们可以使用Object.defineProperty监视某个对象的读写,来为对象添加属性，这样就可以捕获到对象的读写过程
vue3.0之前就是使用这种方法来实现的数据响应,而完成双向数据绑定
*/

const person = {
    name: 'zce',
    age: 20
}

//创建代理对象 第一个参数是要代理的对象
const personProxy = new Proxy(person, {
    get(target, property) {
        console.log(target, property)
        return property in target ? target[property] : 'default'
        //get的返回值是外部访问这个属性得到的结果
    },//监视对象的访问,target为目标对象,property为访问的属性名
    set(target, property, value) {
        console.log(target, property, value, 'set')
        if(property==='age'){
            if(!Number.isInteger(value)){
                throw new TypeError(`${value} is not an int`)
            }
        }
        target[property] = value
    }//监视对象设置属性的过程,三个参数target为目标对象,property为访问的属性名，value为属性值
})

console.log(personProxy.name)
console.log(personProxy.xxx)
// 通过personProxy代理对象给person写入gender属性
personProxy.gender = true
personProxy.age = 'ert'