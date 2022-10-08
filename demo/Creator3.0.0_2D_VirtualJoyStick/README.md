### 简介
基于 CocosCreator 3.0.0 版本创建的 **虚拟摇杆** 工程。

### 效果预览
![image](../../gif/202201/2022012014.gif)

### 相关链接
https://github.com/ifengzp/cocos-awesome/tree/master/assets/Scene/Joystick

### 实现思路
1. 根据监听触摸移动的 TOUCH_START、TOUCH_MOVE、TOUCH_END、TOUCH_CANCEL 等事件，在触摸开始的时候，计算虚拟摇杆的偏移量(也需要将event中的坐标转换为局部的节点本地坐标)，并设置虚拟摇杆的位置
2. 在移动的时候，也需要实时计算虚拟摇杆的偏移量和位置
3. 当触摸结束的时候，应该把虚拟摇杆的坐标回归(0,0,0)原点
4. 在每一帧需要实时计算物体的位置