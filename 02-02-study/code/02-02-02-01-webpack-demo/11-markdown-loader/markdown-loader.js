const marked = require('marked')

module.exports = source => {
  // 
  // console.log(source)
  // return 'console.log("hello ~")'
  const html=marked(source)
  // return `module.exports = ${JSON.stringify(html)}`
  // 返回html 字符串交给下一个loader处理
  return html
}
