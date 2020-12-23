//箭头函数与this
/*
箭头函数不会改变this的指向√
*/
const person = {
    name: 'tom',
    // sayHi: function () {
    //     // 普通函数中，this始终指向调用这个函数的对象
    //     console.log(this)
    //     console.log(`hi,my name is ${this.name}`)
    // }
    //hi,my name is tom


    sayHi: () => {
        // 在箭头函数中，箭头函数外面this是什么，箭头函数里面this就是什么
        console.log(this)
        console.log(`hi,my name is ${this.name}`)
    },
    //hi,my name is undefined

    sayHiAsync: function () {
        /* 
        setTimeout里的函数是放在全局对象上被调用，所以里面function拿不到当前作用域对象里面的this
        一般会定义一个_this去保存当前作用域的this
        借助于闭包的机制去在内部使用this
        */
        // const _this = this
        // setTimeout(function () {
        //     console.log(_this.name,'sayHiAsync')
        // }, 1000)

        // 如果使用箭头函数,因为里面的this始终是当前作用域里面的this,也就是指向person
        setTimeout(()=>console.log(this.name,'arrow this'))
    }
}
person.sayHi()
// let person2Say = person.sayHi
// person2Say()
//hi,my name is undefined

person.sayHiAsync()