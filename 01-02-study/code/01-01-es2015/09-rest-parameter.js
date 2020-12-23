//剩余参数
// console.log(1,2,3)
/*
只能出现在参数最后一位，而且只能是用一次
*/

function foo(first,...rest){
    // arguments是伪数组
    console.log(arguments)
    console.log(rest)
}
foo(1,2,3)