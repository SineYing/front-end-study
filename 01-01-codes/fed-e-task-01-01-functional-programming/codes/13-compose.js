//函数组合演示
function compose(f,g){
    return function(value){
        return f(g(value))
    }
}
//翻转
function reverse(arr){
    return arr.reverse()
}
//数组的第一个元素
function first(arr){
    return arr[0]
}

const last = compose(first,reverse)

console.log(last([2,3,5,6]))