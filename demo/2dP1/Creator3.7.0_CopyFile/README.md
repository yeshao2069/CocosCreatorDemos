### Introduction
**Copy File** project created based on CocosCreator version 3.7.0

### Preview  
![image](../../../image/202206/2022062901.png)

### Support
- web
- iOS
- android

### Mark
- When packaging native, just rename the bak under the project to native and then build it.

- If you encounter "ModelCache.safeGet(androidProjectResult.androidProject::getNdkVersion, "") must not be null"    
> Solution: add ndkVersion "" to native/engine/android/app/build.gradle under the project and ndkVersion "" to build/android/proj/libservice/build.gradle