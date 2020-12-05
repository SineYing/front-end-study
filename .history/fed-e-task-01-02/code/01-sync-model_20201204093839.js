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
global begin
foo task
bar task
gloabal task
*/
