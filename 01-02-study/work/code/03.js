var arr = [12, 34, 32, 89, 4]
let min = arr.reduce((pre, item, arr) => {
    return pre - item ? item : pre
})
console.log(min)