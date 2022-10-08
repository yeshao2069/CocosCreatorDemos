### 简介
基于 CocosCreator 3.6.0 版本创建的 **剪切板** 工程。

### 效果预览  
![image](../../../image/202206/2022062901.png)

### 平台支持
- web
- iOS
- android

### 使用方式
- 打包原生时，将项目下的 bak 改名为 native 后，进行构建即可。

### 备注
- 如果遇到 “ModelCache.safeGet(androidProjectResult.androidProject::getNdkVersion, "") must not be null”    
> 解决方案：在项目下的 native/engine/android/app/build.gradle 中添加 ndkVersion ""，在 build/android/proj/libservice/build.gradle 中添加 ndkVersion ""