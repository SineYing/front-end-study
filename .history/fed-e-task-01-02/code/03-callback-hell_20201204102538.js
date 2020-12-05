//回调
function foo(callback){
    setTimeout(()=>{
        callback()
    },1000)
}
foo(()=>{
    console.log("这就是一个回调函数")
    console.log("调用者调用这个函数，执行者执行这个函数")
    console.log("其实就是调用者告诉执行者任务执行完成后应该干什么")
})