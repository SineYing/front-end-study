console.log('global begin')
function bar (){
    console.log('bar task')
}
function foo(){
    console.log('foo task')
    bar()
}
foo()
console.log('global end')
/*
输出顺序为
global begin
foo task
bar task
gloabal end

同步执行函数
*/
