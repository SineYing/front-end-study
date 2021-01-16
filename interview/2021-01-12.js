function flatten(input) {
    // 方法1
    // let str = JSON.stringify(input).replace(/\[|\]/g, '').split(',').map(i=>i.includes('"')?i.replace(/\"|\"/g,''):parseInt(i))
    // return str

    // 方法2 - 这种方式不适合包含字符串的数组
    // let str = input.toString().split(',').map(i=>parseInt(i))
    // return str

    // 方法3.1
    // let arrF = []
    // flatArr(input)
    // function flatArr(arr) {
    //     arr.map(i => {
    //         if (Array.isArray(i)) {
    //             flatArr(i)
    //         } else {
    //             arrF = [...arrF, i]
    //         }
    //     })
    // }
    // return arrF
    return reduceFn(input)
}
function flatten(arr){
    return arr.reduce((prev,cur)=>{
        return prev.concat(Array.isArray(cur)?flatten(cur):cur)
    },[])
}

const input = [[1, 2, 3], [3, 4, 'qw', 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
console.log(flatten(input))