let a = [12,3,1,67,3,5], b = [17,23,90,46,32]
function contactSort(a, b) {
    let results = [...a, ...b]
    return results.sort((i, j) => {
        return i - j
    })
}
console.log(contactSort(a, b))