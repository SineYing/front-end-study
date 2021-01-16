function flatten05(arr) {
    return JSON.parse("[" + JSON.stringify(arr).replace(/(\[\]\,)|[\[\]]*/g, "") + "]");
}
let oldArr = [[1, 2, 2], [23, 4, '5', 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

console.log(flatten05(oldArr));