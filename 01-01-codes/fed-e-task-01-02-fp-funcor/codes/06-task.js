//Task处理异步任务
// 在node中用于读取文件
const fs = require('fs')
const { split, find } = require('lodash/fp')
//task 在2.0中是一个函数是小写
const { task } = require('folktale/concurrency/task')
const { Resolver } = require('dns')
//读取文件的函数
function readFfile(filename) {
    /*
    task接收一个固定的参数resolver，resolver是一个对象，给我们提供了两个方法一个是resolve成功之后调用的方法，
    一个是reject失败后调用的方法
    
    */
    return task(resolver => {
        /*
        readFile异步来执行文件
        需要三个参数：文件路径、读取文件使用的编码、回调函数（node里面是错误优先，所以先是err，后面才是我们要读取的数据）

        */
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) resolver.reject(err)

            resolver.resolve(data)
        })
    })
}

//调用，会返回一个task函子，调用run才会读取文件
readFfile('package.json')//会返回一个task函子,所有的函子都有一个map方法，所以在run之前我们可以调用一下map方法，在map方法里我们可以处理我们拿到的结果
    .map(split('\n'))//处理拿到的结果，拿到数组
    .map(find(x=>x.includes('version')))//通过find
    .run()
    .listen({
        //listen用来监听执行状态，以事件的机制来提供的
        onRejected: err => {
            console.log(err)
        },
        onResolved: value => {
            console.log(value)
            //可以直接处理这个value来拿version，但是这就不是函数式编程了
        }
    })

/*
{
"name": "fp-functor",
"version": "1.0.0",
"description": "",
"main": "01-functor.js",
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
        "folktale": "^2.3.2",
        "lodash": "^4.17.15"
    }
}
*/