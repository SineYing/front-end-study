//微任务
console.log("start")
setTimeout(()=>{
    console.log("setTimeout")
},0)
Promise.resolve(()=>{
    console.log("promise1")
})
.then(()=>{
    console.log("promise 2")
})
.then(()=>{
    console.log("promise 3")
})
console.log("end")