//referrence
function objGroup(obj1, obj2) {
    obj1.next = obj2
    // obj2.pre = obj1
    return {
        // o1: obj1,
        o2: obj2
    }
}
const obj = objGroup({ name: 'obj1' }, { name: 'obj2' })
console.log(obj)