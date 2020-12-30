//多目标任务
module.exports = grunt => {
    grunt.initConfig({
        build: {
            // options不是任务的目标，而是任务的配置选项
            options: {
                foo: 'bar'
            },
            // 定义多个目标
            css: {
                // 在目标中也可以添加选项，且可以覆盖任务中的配置
                options:{
                    foo:'baz'
                }
            },
            js: '2'
        }
    })
    // 多目标任务通过registerMultiTask来注册
    grunt.registerMultiTask('build', function () {
        console.log('build task')
        //No "build" targets found.需要配置不同的目标
        console.log(`target:${this.target},data:`,this.data)
        //target:css,data:1
        // 获取build任务的配置选择项
        console.log(this.options())
    })
}