/*
const声明过后不能修改
也就是声明的时候必须设置一个初始值，声明和赋值不能和var一样放到两个语句当中
// */
// const name = 'qwe'
// name = 'ert'
//TypeError: Assignment to constant variable.


/*
const声明的成员不能被修改，只是说我们在声明后不能去指向一个新的内存地址，并不是
不能修改常量中的属性成员
*/
// const obj={}
// obj.name='qwe'
// //这样是被允许的
// obj = { 'a': 1 }
//这样是不被允许的