//回调
function foo(callback){
    setTimeout(()=>{
        callback()
    },1000)
}
foo(()=>{
    
})