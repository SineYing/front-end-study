
// dest目标位置
const { src, dest, parallel, series, watch } = require('gulp')
// 用于删除文件
const del = require('del')
// 开发服务器
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()

// 创建一个开发服务器
const bs = browserSync.create()

// 删除dist文件夹
const clean = () => {
  return del(['dist'])
}

// const 样式文件
const styles = () => {
  //dist分发发布  
  //{ base: 'src' }基于src
  return src('src/assets/styles/*.scss', { base: 'src' })
    // sass工作过程中_开头的css文件会被过滤掉
    //outputStyle: 'expanded' 完全展开
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    // preset是所有babel插件的一个集合，env是所有es6特性的一个打包
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
}
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}
const page = () => {
  return src('src/**/*.html', { base: 'src' })
    .pipe(plugins.swig({ data }))
    .pipe(dest('dist'))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('public'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', styles)
  watch('src/assets/scripts/*.js', script)
  watch('src/**/*.html', page)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)
  // watch('src/assets/images/**',image)
  // watch('src/assets/fonts/**',font)
  // watch('public/**',extra)
  // 初始化服务器的初始配置
  bs.init({
    notify: false,
    port: 2080,
    // open: true,
    files: 'dist/**',
    server: {
      // 服务器的访问目录
      baseDir: ['dist', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 文件引用
const useref = () => {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    .pipe(dest('dist'))
}



const compile = parallel(styles, script, page, image, font)
//上线之前执行的任务
const build = series(clean, parallel(compile, extra))
const develop = series(compile, serve)
module.exports = {
  compile,
  build,
  develop,
  useref
}