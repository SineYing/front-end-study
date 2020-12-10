let value = [1, 2, 56, 76, 2]
const fn = (value) => value * value
let abc = value.reduce((pre, cur) => {
    return pre + cur
}, 100)
console.log(abc)