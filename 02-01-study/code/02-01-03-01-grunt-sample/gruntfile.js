//grunt的入口文件
//用于定义一些需要grunt自动执行的任务
/**
 * 需要导出一个函数
 * 此函数接收一个grunt的形参，内部提供一些创建任务时可以用到的API
 */
module.exports = grunt => {
    // registerTask注册任务，第一个参数为任务的名称，第二个参数如果为函数就是要执行的内容
    grunt.registerTask('foo', () => {
        console.log("hello grunt")
    })
    // 第二个参数为字符串则为任务描述
    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task~')
    })

    // 第一个参数为default则是grunt的默认任务，执行的时候不需要指定名称
    // grunt.registerTask('default',()=>{
    //     console.log("default task~")
    // })

    // default第二个参数为数组时，会依次执行数组中的任务
    grunt.registerTask('default',['foo','bar'])

    // grunt中对异步任务的支持,默认支持同步函数
    // grunt.registerTask('async-task',()=>{
    //     setTimeout(()=>{
    //         console.log('async tasj working')
    //     },100)
    // })
    // 因为内部要使用this.async()所以不能使用箭头函数
    grunt.registerTask('async-task',function(){
        const done = this.async()
        setTimeout(()=>{
            console.log('async tasj working')
            // 执行以下done表示任务完成
            done()
        },100)
    })
}