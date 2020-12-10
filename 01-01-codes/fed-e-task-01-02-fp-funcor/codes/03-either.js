//Either函子

class Left {
    //为了方便我们创建一个静态方法of
    static of(value) {
        return new Left(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        // 
        return this
    }
}

class Right {
    static of(value) {
        return new Right(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Right.of(fn(this._value))
    }
}

// let left = Left.of(12).map(x => x + 2)
// let right = Right.of(12).map(x => x + 2)
// console.log(left,right)
function parseJSON(str){
    try{
        return Right.of(JSON.parse(str))
    }
    catch(e){
        // 
        return Left.of({error:e.message})
    }
}

// let r = parseJSON('{name:张三}')
// console.log(r)
//Left { _value: { error: 'Unexpected token n in JSON at position 1' } }

let r = parseJSON('{"name":"sz"}').map(x=>x.name.toUpperCase())

console.log(r)

//Right { _value: '张三' }

//通过either函子可以去处理异常，并且我们可以在一个函子中记录下来错误信息