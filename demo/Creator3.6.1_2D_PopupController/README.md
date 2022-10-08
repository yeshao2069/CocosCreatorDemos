##  弹窗控制器  PopupController
#### 基于CocosCreator 3.0 的一套框架，目前实现了弹框管理

#### 感谢 dream93分享

### 初始化

```
PopupManager.instance.init():void;
```

### 预加载

```
PopupManager.instance.preLoad(option: { name?: string, prefab?: Prefab, url?: string }):void;
```

### 显示

```
PopupManager.instance.show(option: { name?: string, prefab?: Prefab, path?: string, priority?: number, params?: any, keep?: boolean }):void;
```

### 隐藏

```
PopupManager.instance.hide(name:string):void;
```

### 隐藏所有

```
PopupManager.instance.hideAll():void;
```

### 移除

```
PopupManager.instance.remove(name:string):void;
```

### 移除所有

```
PopupManager.instance.removeAll(name:string):void;
```

### 获取当前弹框的名字

```
PopupManager.instance.getCurrentName(): string | null;
```

### 根据弹框名获取弹框

```
PopupManager.instance.getPopup(name: string): Node | null;
```
