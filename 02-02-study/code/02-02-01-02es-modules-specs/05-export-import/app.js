/**
 * 在当前作用域中就不可以访问这些成员了
 */
// export { foo, bar } from './module.js'

// console.log(foo, bar)

import { Button, Avatar } from './components/index.js'

console.log(Button)
console.log(Avatar)
