//referrence
//obj 和name都是可达的
let obj = { name: 'xm' }
// obj的引用存+1,存在数值变化
let ali = obj 
// 因为ali对name的引用name属性还是可达的
obj = null

console.log(obj)
console.log(ali)