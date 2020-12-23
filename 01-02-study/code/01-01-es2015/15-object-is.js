//Object.is 来判断两个值是否相等

//==会在比较前自动转换数据类型
console.log(
    0 == false
)
//===严格比较，数字0的正负没办法区分，NaN===NAN不相等
console.log(
    0 === false
)
console.log(
    NaN === NaN
)