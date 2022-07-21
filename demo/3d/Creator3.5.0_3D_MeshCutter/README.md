## Cocos Creator Demos

##### 简介
基于 CocosCreator 3.5.0 版本创建的 **3D模型切割** 工程

### 效果预览
![image](../../../gif/202203/2022032002.gif)

### 注意事项
- 目前只支持切割使用了 builtin-unlit 材质的模型；
- 引擎模块需要使用基于 Bullet 的物理引擎；
- 材质设置 CullMode 为 None 能一定程度改善碎块 mesh 穿模的情况，但是性能会有所下降；
- 目前没有对旋转后的模型节点进行切割功能适配，所以需要确保模型的没有旋转；
- 目前方案的性能并不是最佳的；
- 目前方案默认在两点之间的检测精度是 1/256，在这个精度下过于细小的碎块则无法切割。可以通过增大 raycastCount 来提高精度，但是性能会有所下降；
- 不是所有模型节点切割后都不会穿模，这个和模型的原始 mesh 有关，具体啥原因还不清楚；
- 切割后的 meshCollider 碎块目前无法发生物理碰撞；

TODO：
- 支持旋转后的模型节点 *P0*
- 找到切割穿模的原因并解决 *P1*
- 解决切割后的 meshCollider 碎块无法发生物理碰撞的问题 *P1*
- 提高性能 *P2*
- 提高检测的精度 *P2*

### 相关链接
https://github.com/hugoscurti/mesh-cutter    
[sketchfab.com](https://sketchfab.com/search?features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b&licenses=b9ddc40b93e34cdca1fc152f39b9f375&licenses=72360ff1740d419791934298b8b6d270&licenses=bbfe3f7dbcdd4122b966b85b9786a989&licenses=2628dbe5140a4e9592126c8df566c0b7&licenses=34b725081a6a4184957efaec2cb84ed3&licenses=7c23a1ba438d4306920229c12afcb5f9&licenses=783b685da9bf457d81e829fa283f3567&licenses=5b54cf13b1a4422ca439696eb152070d&q=tag%3Afruit&sort_by=-likeCount&type=models)