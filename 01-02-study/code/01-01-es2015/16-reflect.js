//defineProperty与Proxy对比

/*
Proxy可以检测对象属性的删除
*/
const person = {
    name: 'zce',
    age: 20
}

const personProxy = new Proxy(person, {
    // 代理方法,包括target代理对象,索要删除的property属性名称
    deleteProperty(target, property) {
        console.log('delete', property)
        delete target[property]
    },
    set() { }
})

delete personProxy.age
console.log(personProxy)

/*
Proxy可以检测数组的操作，一般用于监测数组的操作方式是重写数组
*/

const list = []
const listProxy