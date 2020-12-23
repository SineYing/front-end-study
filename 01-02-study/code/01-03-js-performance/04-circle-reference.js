//循环引用
function fn(){
    const obj1 = {}
    const obj2 ={}
    // 虽然fn函数中的obj1和obj2是在函数内部声明，但是他们之间存在这循环引用，引用计数算法不能将他们的空间进行回收
    obj1.name = obj2
    obj2.name = obj1
    return 'lg is a coder'
}

fn()