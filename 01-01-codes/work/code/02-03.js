const fp = require('lodash/fp')
//数据
//horsepower 马力 dollar_value 价格 in_stock库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani HUayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}//<-无需改动

// let averageDollarValue = function (cars){
//     let dollar_values = fp.map(function(car){
//         return car.dollar_value
//     },cars)
//     return _average(dollar_values)
// }

let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
console.log(averageDollarValue(cars))