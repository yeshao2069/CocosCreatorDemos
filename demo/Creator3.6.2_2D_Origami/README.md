### Introduction
基于 CocosCreator 3.6.0 版本创建的 折纸 工程。

### Preview
![image](https://gitee.com/yeshaohelpme/DemoImageLibrary/raw/master/gif/20220120/2022012072.gif)

### Related Links
https://github.com/baiyuwubing/cocos-creator-examples/tree/master/folding    
https://mp.weixin.qq.com/s/1guPBbKkG6iWCcWa_uz6CQ

### 实现思路
1. 初始化一个多边形，折叠后分割成两个多边形。
2. 如果需要继续分割，对场上的所有多边形进行折叠，折叠出新的多边形的层级正好与原来的相反。所以，所有的计算和渲染都可以转换成对一个多边形的操作。
3. 为了简化计算，我们约定初始化的多边形为凸多边形。这么做有几个好处。折叠后生成的仍是凸多边形，并且对于每个多边形只会折叠出两个凸多边形。渲染时，分割凸多边形为三角形特别方便，即能快速计算出顶点索引