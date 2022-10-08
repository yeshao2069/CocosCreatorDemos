### 简介
基于 CocosCreator 3.0.0 版本创建的 **3D模型显示在UI中(RenderTexture)** 工程。

### 效果预览
![image](../../gif/202201/2022012003.gif)

### 实现思路
使用 RenderTexture 方式实现，需要将 3D 摄像机渲染的内容显示在精灵 Sprite 上，这就要求需要创建一个 Sprite 用于 3D 模型的内容显示