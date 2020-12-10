// point free
// Hello     World => hello_world
const fp = require('lodash/fp')

const pf = fp.flowRight(fp.replace(/\s+/g,"_"),fp.toLower)
console.log(pf("Hello     World     "))