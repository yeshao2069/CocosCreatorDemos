### 简介
基于 CocosCreator 3.0.0 版本创建的 **3D文本** 工程。

### 效果预览
![image](../../gif/202201/2022012083.gif)

### 实现思路
1. 在 3D 节点上建立一个 namePos 的节点，作为显示 3D 节点的血条或者名字显示的位置。
2. 在 3D 节点下绑定一个相机 camera，当 3D 节点移动的时候，namePos 和相机 camera 也会同步移动。
3. 将 namePos 转化为 UI 坐标的位置 pos，让 UI 下的 Label 同步 pos