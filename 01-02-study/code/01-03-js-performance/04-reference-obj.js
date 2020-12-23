//reference count

const user1 = { age: 11 }
const user2 = { age: 22 }
const user3 = { age: 33 }
const nameList = [user1.age, user2.age, user3.age]

function fn() {
    num1 = 1
    num2 = 2
    //因为um1 和num2不是在函数内部声明的，所以它们被挂载在window上
    const num3 = 3
    const num4 = 4
    //num3和num4在函数执行完成后，在全局作用下就找不到num3和num4,他们的引用计数会回到0，GC就会开始工作将他们进行垃圾回收
}

fn()
console.log(num1, num2)

// user1~user3还在被nameList引用着，所以他们的引用计数不会是0