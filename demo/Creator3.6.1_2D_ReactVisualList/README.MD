## CocosCreatorUIExpand
#### Copy from https://github.com/gh-kL/cocoscreator-list.
#### In order to implement an extension of the Cocos Creator UI component
#### Cocos Creator V3.0.0+
&nbsp;
## 虚拟列表  ReactVisualList

这是一个基于**Cocos Creator**写的**虚拟列表**组件。本组件是配合 Cocos Creator 本身的**滚动窗结构**去写的，所以在编辑器中操作会很方便，**所见即所得**。

在线 DEMO（请科学上网）：

[主示例](https://gh-kl.github.io/cocoscreator-list/web-mobile/index.html "主DEMO")
[页面模式示例](https://gh-kl.github.io/cocoscreator-list/web-mobile-page/index.html "页面模式示例")
[背包示例](https://gh-kl.github.io/cocoscreator-list/web-mobile-bag/index.html "背包示例")
[聊天列表示例](https://gh-kl.github.io/cocoscreator-list/web-mobile-chat-list/index.html "聊天列表示例")
[循环列表示例](https://gh-kl.github.io/cocoscreator-list/web-mobile-cyclic/index.html "聊天列表示例")

Cocos 论坛帖子链接：

> https://forum.cocos.com/t/dc/79055

作者 原项目工程地址:

> https://github.com/gh-kL/cocoscreator-list

- 原项目支持 TS / JS版本， 本项目仅复刻了TS 版本，且编辑器版本需Cocos Creator 3.0.0+

## 本组件支持：

- 所有类型布局。（单列、单行、网格，甚至各种花式 RIGHT_TO_LEFT、BOTTOM_TO_TOP）
- 分帧渲染。
- 循环列表。
- 选择模式。（单选、多选）
- 滑动模式。（普通、粘附、分页）
- 动态 Item 宽/高。（用来做**聊天列表**再适合不过）
- 动态删除 Item 项。
- ...

## 使用说明

1. 在编辑器中，创建一个**ScrollView**（也就是**ScrollView->Mask->Content**这样层级结构的节点！）。
2. 将 `List` 组件挂载到**ScrollView**节点上。
3. 设置**模板 Item**，选择 `TemplateType` ，可切换**模板类型**，请按需选择。
4. 设置**滑动模式（ `SlideMode` ）**， `NORMAL=通常` ， `ADHERING=粘附` ， `PAGE=分页` ，三选一。
5. 设置是否为**虚拟列表（ `Virtual` ）**，默认为 `true` ，意思是仅在可视范围内渲染 `Item` 。反之，如果为 `false` ，则会渲染所有数量的 Item，一般不推荐这么做，但凡事总有个万一，所以预留了。
6. （可选）设置**逐帧渲染（ `FrameByFrameRenderNum` ）**，该数量为**每帧渲染的数量**。
7. 设置**渲染器（ `RenderEvent` ）**，在**View**中写一个函数，将该函数指向**RenderEvent**，运行时，设置 List 数量，Item 将会**通过该函数进行回调**，开发者在该函数中实现**Item 的刷新**。
8. （可选）设置**选择模式（ `SelectedMode` ）**，选择模式有 `SINGLE（单选）` 、 `MULT（多选）` 两种，须将`cc.Button`和`ListItem` 挂载到**模板 Item**上。在**View**中写一个函数，将该函数指向 `SelectedEvent` ，运行时，当**选择变更**，将会通过该函数**回调**。

> 在**View**中，若是**单选**模式，用 `list.selectedId=Number` 来改变**当前选择**。若是**多选**模式，则调用 `list.setMultSelected(args, boolean)` 接口来设置多选数据。

9. 完成以上设置后，在**View**中调用 `list.numItems=Number` 设置列表数量，本组件就会通过**渲染器（即 `RenderEvent` ）**进行**回调**了！

## 小贴士

1. 每一个 `Item-Node` 都会被赋值一个 `_listId` ，即该 `Item` 在 `List` 中的 `下标` 。假如你的 `Item` 是个 `按钮` ，在该 `按钮` 的 `回调事件` 中，通过 `event.currentTarget._listId` 就能取得该 `Item的下标` 了，这非常方便。（ `TS版` 比较特殊， 通过 `event.currentTarget['_listId']` 来获得。）
2. 如果是虚拟列表（即 `virtual`属性为`true`），勾选`ListItem`的`adaptiveSize`属性，能实现`动态Item宽/高`。

## 注意

1. 本组件所依赖的**ScrollView 节点**、**Mask 节点**以及**Content 节点**，这三个节点的**锚点**需要**按方向**去设置。比如**从顶到底单列排列**，就需要设置锚点为（0.5, 1）。如果是**从左到右网格排列**，就需要设置锚点为（0, 1）。始终将锚点设置到**首个 Item**那一边。
2. 理论上**设为虚拟列表后不可再设回普通列表**（即 `virtual` 属性）。
3. SlideMode 设为 `ADHERING（粘附）` 或 `PAGE（页面）` 后，组件将**强行屏蔽惯性滚动**。
4. 设为`循环列表`时，`Content`的`cc.Layout`的`边缘距离（top/bottom/left/right）`要设置成与`spacingX/Y（间距）`一样。`（因为在循环列表中，边距=间距）`。

## 新功能预告

- 下拉刷新。
- 循环列表`PAGE`版。

## 已知问题

- `PAGE`模式下，目前是靠`pageDistance`变量来控制`翻页响应距离`，如果滚动窗口很小，玩家拖动时一次性能拖（翻）1 页以上，那就会存在问题。

## 属性（properties）

#### templateType

模板 Item 类型，分别有 Node 和 Prefab 两种类型可选。

| meta | description       |
|------|-------------------|
| 类型 | List.TemplateType |

#### tmpNode

模板 Item 节点。

| meta | description |
|------|-------------|
| 类型 | Node        |

#### tmpPrefab

模板 Item 预制体。

| meta | description |
|------|-------------|
| 类型 | Prefab      |

#### slideMode

滑动模式。分别有 3 种滑动模式：普通、粘附、页面。

| meta | description    |
|------|----------------|
| 类型 | List.SlideType |

#### pageDistance

翻页作用距离。（仅滑动模式为`页面`时有效）

| meta | description |
|------|-------------|
| 类型 | Number      |

#### pageChangeEvent

翻页响应事件。

| meta | description            |
|------|------------------------|
| 类型 | Component.EventHandler |

#### virtual

是否为虚拟列表。

| meta | description |
|------|-------------|
| 类型 | Boolean     |

#### cyclic

是否为循环列表。

| meta | description |
|------|-------------|
| 类型 | Boolean     |

#### lackCenter

是否在 Item 数量不足以填满 Content 时，居中显示 Item（不支持 Grid 布局）。

| meta | description |
|------|-------------|
| 类型 | Boolean     |

#### lackSlide

是否在 Item 数量不足以填满 Content 时，可滑动列表。

| meta | description |
|------|-------------|
| 类型 | Boolean     |

#### updateRate

刷新频率（值越大刷新频率越低、性能越高）。

| meta | description |
|------|-------------|
| 类型 | Number      |

#### frameByFrameRenderNum

分帧渲染时，每帧渲染的 Item 数量（<=0 时则关闭分帧渲染）。

| meta | description |
|------|-------------|
| 类型 | Number      |

#### renderEvent

渲染事件。

| meta | description            |
|------|------------------------|
| 类型 | Component.EventHandler |

#### selectedMode

选择模式。分别有 2 种选择模式：单选、多选。

| meta | description       |
|------|-------------------|
| 类型 | List.SelectedType |

#### selectedEvent

选择响应事件。

| meta | description            |
|------|------------------------|
| 类型 | Component.EventHandler |

#### selectedId

当前选择索引，可通过设置此属性变更选择。

| meta | description |
|------|-------------|
| 类型 | Number      |

#### numItems

Item 总数，设置此属性后，List 会调用 renderEvent 以渲染 Item。

| meta | description |
|------|-------------|
| 类型 | Number      |

## 方法（method）

> 可供开发者调用的方法都在下面，具体参数就不写了，去看源码吧 (￣ ▽ ￣)"。

#### setTemplateItem

设置模板 Item。

#### checkInited

检查是否已初始化。

#### adhere

粘附到最近的一个 Item。

#### setMultSelected

设置多选数据。

#### updateItem

更新单个 Item。

#### updateAll

更新全部 Item。

#### getItemByListId

根据索引获取 Item。（虚拟列表有可能无法获取到 Item，因为 Item 可能并未出现在视口内）

#### aniDelItem

动销删除单个 Item。（使用方法可参考示例项目）

#### scrollTo

滚动到指定索引 Item 处。

#### prePage

上一页。（仅滑动模式为 `PAGE` 时可用）

#### nextPage

下一页。（仅滑动模式为 `PAGE` 时可用）

#### skipPage

跳转至指定页。（仅滑动模式为 `PAGE` 时可用）

---

## 预览效果
#### Main主界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-Main.gif)
#### TestAdaptive界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-TestAdaptive.gif)
#### TestBag界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-TestBag.gif)
#### TestCyclic界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-TestCyclic.gif)
#### TestLack界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-TestLack.gif)
#### TestPage界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-TestPage.gif)
#### TestWidget界面
![image](https://gitee.com/yeshaohelpme/UIExpandDemoImageLibrary/raw/master/image/ReactVisualList/ReactVisualList-TestWidget.gif)
