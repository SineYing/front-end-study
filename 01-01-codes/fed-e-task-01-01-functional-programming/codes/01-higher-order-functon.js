//高阶函数-函数作为参数
//foreach是遍历数组的每一个元素，然后对每一个元素进行处理

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}

//测试
// let arr =[1,3,5,4,9]
// forEach(arr,function(item){
//     console.log(item)
// })

//filter过滤数组中满足条件的元素
function filter(array, fn) {
    let results = []
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            results.push(array[i])
        }
    }
    return results
}
//测试
let arr = [1, 3, 5, 4, 9]
let r = filter(arr, function (item) {
    return item % 2 === 0
})
console.log(r)