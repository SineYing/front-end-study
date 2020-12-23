//方法1
function Person(){
    this.name = "icoder"
    this.age = 18
    this.getAge = function(){
        return this.age
    }
}

const p1 = new Person()
const a = p1.getAge()


//方法2
function Person(){
    this.name = "icoder"
    this.age = 18
}

const p1 = new Person()
const a = p1.age