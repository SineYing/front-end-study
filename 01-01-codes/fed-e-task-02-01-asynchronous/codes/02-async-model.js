console.log('global begin')
setTimeout(()=>{
    console.log('timer1 invoke')
},1800)
setTimeout(()=>{
    console.log('timer2 invoke')
    setTimeout(()=>{
        console.log('inner invoke')
    },1000)
},1000)
console.log('global end')
/*
执行顺序为
global begin
global end
timer2 invoke
timer1 invoke
inner invoke
*/