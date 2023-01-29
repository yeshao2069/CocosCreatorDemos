### Introduction
**Spine Change Slot With Texture** project created based on CocosCreator version 3.6.0

### Preview
![image](../../../gif/202203/2022032201.gif)

### Mark
- web
Overwrite (or match the code to modify) the skeleton.ts file in the engine engine with the skeleton.ts file from the replaceEngine/web-bak folder under the project.     

Path reference for skeleton.ts file: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/cocos/spine/ skeleton.ts    

You need to go to the top menu bar of Cocos Creator editor and select **Developer**->*Compile Engine**. You need to wait 1~5 min to compile the engine.

- Native（android、iOS、macOS、Windows）
First of all, ** the native part of this solution requires a custom engine, and the custom JSB binding is different from the previous version starting from editor version 3.6.0**

Take version 3.6.0 as an example, customize the engine, choose to modify the engine source code directly (no extra copy of the engine source code to other folders, modify the engine source code in Dashboard directly, if the modification fails or there are other problems, download a copy again. (If you have other engine customization cases, remember to make a backup)

1、Replace the Attachment.cpp、Attachment.h、MeshAttachment.cpp、RegionAttachment.cpp、AttachmentVertices.cpp、AttachmentVertices.h、SkeletonRenderer.cpp、SkeletonRenderer.h、jsb-spine-skeleton.js、spine.ini in replaceEngine/native-bak under the project with the engine.

> Attachment.cpp file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine/Attachment.cpp
>
> Attachment.h file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine/Attachment.h
>
> MeshAttachment.cpp file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine/MeshAttachment.cpp
>
> RegionAttachment.cpp file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine/RegionAttachment.cpp
>
> AttachmentVertices.cpp file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine-creator-support/AttachmentVertices.cpp
>
> AttachmentVertices.h file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine-creator-support/AttachmentVertices.h
>
> SkeletonRenderer.cpp file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine-creator-support/SkeletonRenderer.cpp
>
> SkeletonRenderer.h file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/editor-support/spine-creator-support/SkeletonRenderer.h
>
> jsb-spine-skeleton.js file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/platforms/native/engine/jsb-spine-skeleton.js
>
> spine.ini file path reference: /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/tools/tojs/spine.ini

2、At the command line, execute the following command to regenerate the JSB custom binding related code.
> cd /Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/tools/tojs
>
> python genbindings.py

If you are prompted with a Cannot find yaml related error, then you need to install the YAML dependency.
> sudo pip3 install pyyaml==5.4.1
> 
> sudo pip3 install Cheetah3

If the above command fails to install, then check that you have the correct version of python. You need to install python 3.0+, python 3.9.8 is recommended, and the installation directory https://www.python.org/downloads/release/python-398/

If you execute python genbindings.py after specifying the above command to install the dependencies, you will still get an NDK_ROOT related error. Then you need to set the environment variables. For macOS, set ANDROID_NDK_HOME and NDK_ROOT in the .bash_profile under the system.
> ANDROID_NDK_HOME=/Users/mu/work/Android/SDK/ndk/21.4.7075529
>
> NDK_ROOT=/Users/mu/work/Android/SDK/ndk/21.4.7075529

Once set up, restart your computer or run source .bash_profile to refresh it.
> source .bash_profile

Finally, in the engine code, find whether updateRegion exists in jsb_spine_auto.cpp.jsb_spine_auto.cpp is a file generated via JSB autobinding. File path：/Applications/CocosCreator/Creator/3.6.0/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/bindings/auto/jsb_spine_auto.cpp。

3、In the engine directory, delete the package-lock.json file and regenerate it.
> npm install -g gulp
>
> npm install --force
>
> npm run bundle-adapter

Seeing Generate bundle: engine-adapter.js means that our modified jsb-spine-skeleton.js has taken effect.

4、In the menu bar on the Creator editor, run the compilation engine via Developer->Compile Engine. Wait a few moments. Since you have modified the engine related code, recompile the engine to make it work.

5、Build a native platform.

- Possible problems with custom native
After packaging Android and opening the project with Android Studio, a getNdkVersion null error occurs.

Solution：https://blog.csdn.net/u014206745/article/details/126534718