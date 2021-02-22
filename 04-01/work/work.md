# 4-1

## 1. 请简述 React 16 版本中初始渲染的流程

答：

将React元素渲染到页面中，分为render阶段和commit两个阶段。

render阶段负责创建Fiber数据数据结构并为Fiber节点打标记，标记当前Fiber节点要进行的DOM操作

- render阶段为渲染入口，传入要进行渲染的ReactElment（elment）、渲染容器（container）及渲染完成后的回调函数（callback），返回初始化FiberRoot的函数legacyRenderSubtreeIntoContainer
- legacyRenderSubtreeIntoContainer将子树渲染到容器中，初始化Fiber数据结构，创建fiberRoot和rootFiber，调用legacyCreateRootFromDOMContainer、调用getPublicRootInstance、调用updateContainer
  - 为container容器添加_reactRootContainer属性
  - 在_reactRootContainer对象中有一个属性叫做_internalRoot
  - _internalRoot属性即为FiberRoot表示根节点Fiber数据结构
- legacyCreateRootFromDOMContainer判断是否为服务器端渲染，如果不是清空container，返回createLegacyRoot
  - 为提供首屏加载的用户体验，有时需要在container中放置html内容
  - 将ReactElement渲染到container之前，必然要清空container
  - 在加入站位代码时最好只有一个父级元素，可以减少内部代码的循环次数，提高性能
- createLegacyRoot，通过实例化ReactDOMBlockingRoot类创建 LegacyRoot
- ReactDOMBlockingRoot，类用于创建LegacyRoot的数据结构，内部用到了 createRootImpl
- createRootImpl中主要使用createContainer函数，创建container
- createContainer，创建了contaner并返回createFiberRoot函数
- createFiberRoot创建根节点对应的fiber对象
  - 为fiberRoot添加current属性值为footfiber
  - 为rootFiber添加stateNode属性为fiberRoot
  - 为fiber对象添加updateQueue属性，初始化updateQueue对象
- getPublicRootInstance，获取container的第一个子元素的实例对象
- updateContainer用于计算任务的过期时间，根据过期时间创建Update任务
  - 未防止任务因为优先级的原因一直被打断而未执行，会设置一个过期时间，当时间到了过期时间时，react会强制执行该任务，初始化时任务同步执行不涉及被打断的问题
  - 通过调用enqueueUpdate函数将update对象加入到当前Fiber 的更新队列当中
- enqueueUpdate创建单项链表结构存放update，next用来串联update
- scheduleUpdateOnFiber判断任务是否为同步，调用同步任务入口performSyncWorkOnRoot
- performSyncWorkOnRoot进入render阶段，构建workInprogress Fiber树及rootFiber
  - workInProgressRoot是全局变量初始渲染时值为null，如果接受的root和workInProgressRoot不相等，说明workInProgress不存在，通过prepareFreshStack构建workInProgressFiber及rootFiber
  - 如果root等于workInProgressRoot，则将构建好的新的Fiber对象存储在finishedWork属性中方便提交阶段使用
- prepareFreshStack中通过createWorkInProgress根据currentFiber树中的rootFiber构建workInProgressFiber树中的rootFiber
- createWorkInProgress构建workInProgressFiber树中的rootFiber，构建完成后会替换currentFiber,并初始渲染pendingProps为null
- workLoopSync中通过performUnitOfWork以同步的方式构建workInProgress Fiber
- performUnitOfWork在初次渲染时通过beginWork存储下一个要构建的子集Fiber对象
  - 如果子节点不存在说明当前节点向下遍历子节点已经到底了，则继续向上返回。通过completeUnitOfWork存储下一个要构建的兄弟节点的子Fiber对象
  - beginWork从父到子构建Fiber节点对象
  - completeUnitOfWork从下至上移动到该节点的兄弟阶段，如果一直往上没有兄弟节点就返回父节点，最终会到达root节点


## 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

答：
由于递归使用 JavaScript 自身的执行栈，一旦开始就无法停止，直到任务执行完成。如果 VirtualDOM 树的层级比较深，virtualDOM 的比对就会长期占用 JavaScript 主线程，由于 JavaScript 又是单线程的无法同时执行其他任务，所以在比对的过程中无法响应用户操作，无法即时执行元素动画，会造成页面卡顿。

## 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

答：

- 第一个阶段before mutation阶段，调用类组件的getSnapshotBeforeUpdate生命周期函数
  - 进行快照存储，便于componentDidUpdate生命周期的使用
- 第二个阶段mutation阶段，根据EffectTag执行DOM操作的增删改
- 第三个阶段类组件处理生命周期函数和函数组件处理钩子函数

## 4. 请简述 workInProgress Fiber 树存在的意义是什么

答：
workInProgress Fiber 树的意义是React发生变化时会在内存中构建一颗Fiber树，绘制完毕后直接用替换在屏幕中显示的current Fiber树，这样的话在帧画面替换的过程中就会节约非常多的时间，就不会出现白屏问题。