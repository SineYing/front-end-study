/**
 * 首先要yarn add grunt-contrib-clean
 * 
 */
module.exports = grunt => {
    grunt.initConfig({
        clean:{
            // 设置要清除的路径
            // temp:'temp/app.js'
            // temp:'temp/*.txt'
            temp:'temp/**'
        }
    })
    grunt.loadNpmTasks('grunt-contrib-clean')
    //No "clean" targets found.可以看出clean是个多目标任务
}