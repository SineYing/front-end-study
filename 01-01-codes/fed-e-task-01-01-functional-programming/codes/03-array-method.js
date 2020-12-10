//map array some

/*map 
是对数组中的每一个元素进行遍历，
并对每一个元素进行处理，并且把结果返回到一个新的数组中
*/
const map = (array, fn) => {
    const results = []
    // for of是对for的抽象
    for (let value of array) {
        results.push(fn(value))
    }
    return results
}

// 测试

/*
总结：map函数的参数是一个函数，是一个高阶函数，
可以通过指定函数对数组中的元素进行任意的求值，
函数参数会让我们的map函数更灵活
*/
// let arr = [1, 5, 7, 9, 12]
// arr = map(arr, v => v * v)
// console.log(arr)


/*every
用来判断数组中的元素是否都匹配我们指定的一个条件
这个条件是灵活的，是变化的
*/

const every = (array, fn) => {
    let result = true
    for (let value of array) {
        result = fn(value)
        if (!result) {
            break
        }
    }
    return result
}

// // 测试
// let arr = [1, 5, 7, 9, 12]
// let result = every(arr, v => v > 0)
// console.log(result)


/*
some 与every类似，来检测我们数组中的元素是否有一个满足我们的条件

*/

const some = (array, fn) => {
    let result = false
    for (let value of array) {
        result = fn(value)
        if (result) {
            break
        }
    }
    return result
}

// 测试

let arr = [1, 5, 7, 9, 11]
let r = some(arr, v => v % 2 === 0)
console.log(r)