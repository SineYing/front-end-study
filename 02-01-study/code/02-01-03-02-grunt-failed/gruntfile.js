//标记任务失败
module.exports = grunt => {
    grunt.registerTask('bad',()=>{
        console.log('bad working')
        // 表示当前任务执行失败，如果当前任务在任务列表中，会导致后续任务不再被执行
        return false
    })
    grunt.registerTask('foo',()=>{
        console.log('foo task~')
    })
    grunt.registerTask('baz',()=>{
        console.log('baz task~')
    })
    grunt.registerTask('default',['foo','bad','baz'])
    //异步任务标记失败
    grunt.registerTask('async-task',function(){
        const done = this.async()
        setTimeout(()=>{
            console.log('async task~')
            // 传入false表示任务执行失败
            done(false)
        },100)
    })
}
//yarn grunt只会执行foo和bad
//yarn grunt --force会强制执行所有的任务