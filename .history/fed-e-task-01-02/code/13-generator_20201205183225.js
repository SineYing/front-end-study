//generator
function* foo() {
    console.log('start')
    //函数内部可以使用yield关键词往外返回一个值
    yield
}
//当我们调用这个generator函数并没有立即执行
const generator = foo()
//而是手动调用这个函数的.next，这个函数的函数体才会开始执行
const result = generator.next()
