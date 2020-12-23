//内存管理生命周期
//申请空间，JavaScript引擎遇到变量声明的时候自动分配相应的空间
let obj = {}
//使用空间,即对对象的一个读写的操作
obj.name = 'lg'
//释放空间
obj = null