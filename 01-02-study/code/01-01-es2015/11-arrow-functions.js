//箭头函数

// 传统方式
function inc(n) {
    return n + 1
}
//箭头函数
/*
有多条语句时
使用{}时需要手动return

极大的简化了回调函数的编写
*/
const inc = (n, b) => n + 1
const inc = (n, b) => {
    return n + 1
}
console.log(inc(1))

// 刷选奇数
const arr = [1, 2, 3, 4, 5, 6, 7, 8]
arr.filter(function (item) {
    return item % 2
})
arr.filter(item => item % 2)
