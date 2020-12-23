//数组展开 spread

const arr = ['foo','bar','baz']

//之前展开数组
console.log(arr[0],arr[1],arr[2])
//不确定数组长度
console.log.apply(console,arr)
console.log(...arr)