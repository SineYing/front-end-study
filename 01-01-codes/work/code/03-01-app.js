//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./03-support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
    return maybe.map(x => fp.map(a => fp.add(a, 1), x))
}
console.log(ex1())