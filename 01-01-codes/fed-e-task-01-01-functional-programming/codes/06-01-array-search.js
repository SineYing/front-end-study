//严格相等
let num = [1, 2, 3, 4, 5, 4, 3, 2, 1, 6]

console.log(num.indexOf(4))//3
console.log(num.lastIndexOf(6))//9
console.log(num.includes(4))//true

console.log(num.indexOf(3,2))//true
console.log(num.lastIndexOf(3,4))//true

let person = { name: 'nike' }
let people = [{ name: 'nike' }]
let morePeople = [person]

console.log(people.indexOf(person))
console.log(morePeople.indexOf(person))
console.log(people.includes(person))
console.log(morePeople.includes(person))