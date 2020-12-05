//generator
function * foo(){
    console.log('start')
}
//当我们调用这个generator函数并没有立即执行
const generator = foo()
//而是手动
