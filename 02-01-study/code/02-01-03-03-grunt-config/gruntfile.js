//grunt配置
module.exports = grunt => {
    grunt.initConfig({
        // foo:'bar'
        // 这里foo可以接收各种类型
        foo:[1,2]
    })
    grunt.registerTask('foo',()=>{
        // grunt.config接收是initConfig中的键
        console.log(grunt.config('foo'))
    })
}