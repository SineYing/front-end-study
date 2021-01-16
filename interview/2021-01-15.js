/**
 * 1.数据格式转换，将obj转换成list
 */
let obj = {
    property1: ['a', 'b'],
    property2: ['1', '2', '3'],
    property3: ['5', 'g', '7'],
}
function toArr(obj) {
    let list = [], newList = []
    for (let i in obj) {
        let newArr = obj[i]
        obj[i].map((j, index) => {
            list = [...list, { [i]: j }]
        })
    }
    let listLength = list.length
    for (let i = listLength; i > 0; i--) {
        let newObj = arrFor(list, newList)
        newList = [...newList, newObj]
    }
    // console.log(list)
    return newList
}
function arrFor(arr, newList) {
    let objNew = {}
    let listUpdate = []
    for (let a in arr) {
        let keys = Object.keys(objNew), keyA = Object.keys(arr[a])[0]
        let isIn = false
        newList.map((com,index)=>{

        })
        if (keys.indexOf(keyA) < 0) {
            objNew = { ...objNew, ...arr[a] }
        }
        
    }
    console.log(objNew)
    return objNew
}
toArr(obj)
// console.log(toArr(obj))