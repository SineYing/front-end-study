//generator
function * foo(){
    console.log('start')
    yield 
}
//当我们调用这个generator函数并没有立即执行
const generator = foo()
//而是手动调用这个函数的.next，这个函数的函数体才会开始执行
generator.next()
