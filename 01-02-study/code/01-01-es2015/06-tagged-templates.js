//带标签的模板字符串
// const str = console.log`hello World`
// [ 'hello World' ]

/*

*/
const name = 'tom'
const gender = true
function myTag(str,name,gender) {
    // console.log(str)
    // console.log(name)
    // console.log(gender)
    /*
    1、返回模板字符串内容分割后的结果，是按照表达式分割过后那些静态的内容
    所以是个数组

    2、还可以接收所有出现在我们模板字符串中表达式的返回值

    3、这个函数的返回值就是带标签的模板所对应的返回值

    4、作用就是对我们的字符串进行加工,文本的多语言化，内容翻译，模板引擎
    */
   return 123//123
    //[ 'Hey,', ' is a ', '' ]
}
const result = myTag`Hey,${name} is a ${gender}`
console.log(result)