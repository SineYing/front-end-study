//纯函数和不纯函数

let array = [1, 2, 5, 8, 0]

//纯函数是指相同的输入始终有相同的输出
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))
//[1,2,5]

//splice是不纯的函数
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))
//[1,2,5] [8,0] []


//纯函数
function getSum(n1, n2) {
    return n1 + n2
}
console.log(getSum(1, 2))
console.log(getSum(1, 2))
console.log(getSum(1, 2))