//数组的解构

const arr = [100, 300, 600]

//之前是通过索引去获取相应的值
// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]
// console.log(foo, bar, baz)

/*
现在可以通过结构的方式快速拿到相应的值
可以根据我们定义变量的位置去分配变量的值
*/
// const [foo,bar,baz]=arr
// console.log(foo,bar,baz)

/*
只获取某个位置的成员，其他位置需要保留相应的”，“
*/
// const [,,baz]=arr
// console.log(baz)

/*
...表示从当前位置开始往后所有的成员，这里只能放到最后使用,且返回的是个数组
*/
// const [foo, ...rest] = arr
// console.log(rest)

/*
如果结构成员的个数小于被解构数组的长度，那就会按照从前到后的顺序去提取
*/

// const [foo] = arr
// console.log(rest)

/*
如果结构成员的个数大于被解构数组的长度，那提取出来就是undefined，与数组中访问不存在的下标是一样的
*/
// const [foo, bar, baz, opp] = arr
// console.log(opp)

/*
给提取到的成员设置默认值
*/
// const [foo, bar, baz = 100, opp = 900] = arr
// console.log(opp)

/*
举例
*/
const path = '/foo/bar/baz'
// const tmp = path.split('/')
// const rootdir = tmp[1]

const[,rootdir]= path.split('/')
console.log(rootdir)