let arr = new Array(1, 3, 4, 5, 6)
arr.forEach((item) => {
    console.log(item,'foreach')
})

for (var i = arr.length-1; i>-1; i--) {
    console.log(arr[i],'for')
}

for(let i in arr){
    console.log(arr[i],"in")
}

for(let i of arr){
    console.log(i,'of')
}