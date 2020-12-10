//断言函数
const people = [
    {
        name: 'Matt',
        age: 28
    }, {
        name: 'nike',
        age: 30
    }
]

// console.log(people.find(item => item.age > 28))
// console.log(people.findIndex(item => item.age > 28))

let nums = [3, 6, 9]
nums.find((item, index, array) => {
    console.log(item)
    console.log(index)
    console.log(array)
    return item > 1
})