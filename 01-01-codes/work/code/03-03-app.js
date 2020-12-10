//app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./03-support')
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    //需要实现的函数
    return safeProp('name', user).map(o => fp.first(o))
}

console.log(ex3())