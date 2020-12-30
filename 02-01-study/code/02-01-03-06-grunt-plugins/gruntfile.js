const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
        // grunt-sass为多目标任务，所以要进行目标配置
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                // 
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        // 主要用于处理Es6编译问题
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    //输出-输入
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        //监听
        watch: {
            js: {
                files: ['src/js/*.js'],
                // 表示监视文件做修改时要执行的任务
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)//自动加载所有的grunt插件中的任务

    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}