let a = [['A', 'B'], ['a', 'b'], [1, 2]]
let c = a.reduce((pre, cur, index, arr) => {
    let r = []
    for (let i in pre) {
        for (let j in cur) {
            r=[...r,`${pre[i]}${cur[j]}`]
        }
    }
    return r
})
console.log(c)
