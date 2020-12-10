//柯里化演示
function checkAge(age) {
    let min = 18
    return age > min
}
//普通的纯函数
function checkAge(min, age) {
    return age >= min
}
//基准值会经常重复
// console.log(checkAge(18, 20))
// console.log(checkAge(18, 24))
// console.log(checkAge(22, 24))

//函数的柯里化
// function checkAgeB(min) {
//     return function (age) {
//         return age >= min
//     }
// }
//es6箭头函数
let checkAgeB = min => (age => age >= min)

let checkAgeB18 = checkAgeB(18)
let checkAgeB20 = checkAgeB(20)

console.log(checkAgeB18(25))
console.log(checkAgeB18(20))
console.log(checkAgeB20(20))
console.log(checkAgeB20(24))