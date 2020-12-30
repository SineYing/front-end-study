#!/usr/bin/env node
/**
 * Node CLI应用入口文件必须有这样的文件头
 * 如果是Linux或者macOS系统下还需要修改此文件的读写权限为755
 * 具体就是通过chmod 755 cli.js实现修改
 */

/**
 * 脚手架工作过程
 * 1.通过命令行交互询问用户问题
 * 2.根据用户回答的结果生成文件
 * 3.通过yarn add inquirer添加依赖，发起命令行交互询问
 * 4.明确项目的根目录和模板目录
 */
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')
inquirer.prompt([
    {
        type: 'input',//问题输入的方式
        name: 'name',//问题名称
        message: 'Project name?'//问题信息
    }
]).then(answers => {
    // 根据用户回答的结果生成文件

    //模板目录
    //Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径
    //./ 会返回你执行 node 命令的路径
    const tempDir = path.join(__dirname, 'temp')

    //目标目录
    const destDir = process.cwd()

    //用fs读取模板文件下的文件全部输出到目标目录
    fs.readdir(tempDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            // 通过模板引擎渲染
            //第一个参数是files的路径，第二个参数是询问结果的上下文,第三个参数是回调函数
            ejs.renderFile(path.join(tempDir, file), answers, (err, result) => {
                if (err) throw err
                //通过文件写入的方式写入目标目录
                fs.writeFileSync(path.join(destDir, file), result)
            })
        });
    })
})