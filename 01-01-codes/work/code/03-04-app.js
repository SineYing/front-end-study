//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./03-support')
// let ex4 = function (n) {
//     if (n) {
//         return parseInt(n)
//     }
// }
let ex4 = (n) => {
    return Maybe.of(n).map(x => parseInt(n))
}
console.log(ex4(1.9))