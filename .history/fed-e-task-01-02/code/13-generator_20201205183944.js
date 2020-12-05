//generator
function* foo() {
    console.log('start')
    //函数内部可以使用yield关键词往外返回一个值
    /*yield执行器并不表示函数已经全部执行完了，并不会跟return一样立即结束当前函数，它只是暂停生成器函数的执行
    直到外部再次使用next，当前函数才会继续往下执行
    */
    yield 'foo'
}
//当我们调用这个generator函数并没有立即执行
const generator = foo()
//而是手动调用这个函数的.next，这个函数的函数体才会开始执行
//可以在next返回对象中拿到函数中yield返回的值
const result = generator.next()

/*
{one: false;value: "foo"}
返回对象中有一个done属性，去表示这个生成器是否全部执行完成
*/
console.log(result)


generator.next('bars')
