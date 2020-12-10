const fp = require('lodash/fp')
const { Maybe, Container } = require('./03-support')
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
    //你要实现的函数
    return xs.map(x => fp.first(x))
}
console.log(ex2())