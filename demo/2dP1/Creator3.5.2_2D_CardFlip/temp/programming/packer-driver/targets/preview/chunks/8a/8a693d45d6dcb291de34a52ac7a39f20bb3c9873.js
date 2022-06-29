System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, isValid, warn, instantiate, macro, PopupBase, PopupParamsType, PopupRequestType, PopupManager, _crd, CacheMode, ShowResultType;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfPopupBase(extras) {
    _reporterNs.report("PopupBase", "./PopupBase", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      isValid = _cc.isValid;
      warn = _cc.warn;
      instantiate = _cc.instantiate;
      macro = _cc.macro;
    }, function (_unresolved_2) {
      PopupBase = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "50eaawLPZRENJEcGEpVVJKs", "PopupManager", undefined);

      (function (CacheMode) {
        CacheMode[CacheMode["Once"] = 1] = "Once";
        CacheMode[CacheMode["Normal"] = 2] = "Normal";
        CacheMode[CacheMode["Frequent"] = 3] = "Frequent";
      })(CacheMode || (CacheMode = {}));

      (function (ShowResultType) {
        ShowResultType[ShowResultType["Done"] = 1] = "Done";
        ShowResultType[ShowResultType["Failed"] = 2] = "Failed";
        ShowResultType[ShowResultType["Waiting"] = 3] = "Waiting";
      })(ShowResultType || (ShowResultType = {}));

      PopupParamsType = class PopupParamsType {
        constructor() {
          this.mode = CacheMode.Normal;
          this.priority = 0;
          this.immediately = false;
        }

      };
      PopupRequestType = class PopupRequestType {
        constructor() {
          this.path = void 0;
          this.options = void 0;
          this.params = void 0;
          this.popup = void 0;
          this.node = void 0;
        }

      };

      _export("default", PopupManager = class PopupManager {
        // /**
        // * 预制体缓存
        // */
        static get prefabCache() {
          return this._prefabCache;
        }

        // /**
        // * 节点缓存
        // */
        static get nodeCache() {
          return this._nodeCache;
        }

        // /**
        // * 当前弹窗请求
        // */
        static get current() {
          return this._current;
        }

        // /**
        // * 等待队列
        // */
        static get queue() {
          return this._queue;
        }

        // /**
        // * 被挂起的弹窗队列
        // */
        static get suspended() {
          return this._suspended;
        }

        // /**
        // * 用于存放弹窗节点的容器节点（不设置则默认为当前 Canvas）
        // */
        static get container() {
          return this._container || cc.Canvas.instance.node;
        }

        static set container(value) {
          this._container = value;
        }

        // /**
        // * 弹窗缓存模式
        // */
        static get CacheMode() {
          return CacheMode;
        } // /**
        // * 弹窗请求结果类型
        // */


        static get ShowResultType() {
          return ShowResultType;
        } // /**
        // * 弹窗动态加载开始回调
        // * @example
        // * PopupManager.loadStartCallback = () => {
        // *     LoadingTip.show();
        // * };
        // */


        // /**
        // * 展示弹窗，如果当前已有弹窗在展示中则加入等待队列
        // * @param path 弹窗预制体相对路径（如：prefabs/MyPopup）
        // * @param options 弹窗选项（将传递给弹窗的组件）
        // * @param params 弹窗展示参数
        // * @example
        // * const options = {
        // *     title: 'Hello',
        // *     content: 'This is a popup!'
        // * };
        // * const params = {
        // *     mode: PopupCacheMode.Normal
        // * };
        // * PopupManager.show('prefabs/MyPopup', options, params);
        // */
        static show(path, options, params) {
          var _this = this;

          return new Promise( /*#__PURE__*/_asyncToGenerator(function* (res) {
            // // 解析处理参数
            params = _this.parseParams(params); // // 当前已有弹窗在展示中则加入等待队列

            if (_this._current || _this.locked) {
              // // 是否立即强制展示
              if (params && params.immediately) {
                _this.locked = false; // // 挂起当前弹窗

                yield _this.suspend();
              } else {
                // // 将请求推入等待队列
                _this.push(path, options, params);

                res(ShowResultType.Waiting);
                return;
              }
            } // // 保存为当前弹窗，阻止新的弹窗请求


            _this._current = {
              path,
              options,
              params
            }; // // 先在缓存中获取弹窗节点

            var node = _this.getNodeFromCache(path); // // 缓存中没有，动态加载预制体资源


            if (!isValid(node)) {
              // // 开始回调
              _this.loadStartCallback && _this.loadStartCallback(); // // 等待加载

              var prefab = yield _this.load(path); // // 完成回调

              _this.loadFinishCallback && _this.loadFinishCallback(); // // 加载失败（一般是路径错误导致的）

              if (!isValid(prefab)) {
                warn('[PopupManager]', '弹窗加载失败', path);
                _this._current = null;
                res(ShowResultType.Failed);
                return;
              } // // 实例化节点


              node = instantiate(prefab);
            } // // 获取继承自 PopupBase 的弹窗组件


            var popup = node.getComponent(_crd && PopupBase === void 0 ? (_reportPossibleCrUseOfPopupBase({
              error: Error()
            }), PopupBase) : PopupBase);

            if (!popup) {
              warn('[PopupManager]', '未找到弹窗组件', path);
              _this._current = null;
              res(ShowResultType.Failed);
              return;
            } // // 保存组件引用


            _this._current.popup = popup; // // 保存节点引用

            _this._current.node = node; // // 添加到场景中

            node.setParent(_this.container); // // 显示在最上层

            node.setSiblingIndex(macro.MAX_ZINDEX); // // 设置完成回调
            // // @ts-ignore

            popup.finishCallback = /*#__PURE__*/_asyncToGenerator(function* (suspended) {
              if (suspended) {
                return;
              } // // 是否需要锁定


              _this.locked = _this._suspended.length > 0 || _this._queue.length > 0; // // 回收

              _this.recycle(path, node, params.mode);

              _this._current = null;
              res(ShowResultType.Done); // // 延迟一会儿

              yield new Promise(_res => {
                cc.Canvas.instance.scheduleOnce(_res, _this.interval);
              }); // // 下一个弹窗

              _this.next();
            }); // // 展示

            popup.show(options);
          }));
        } // /**
        // * 隐藏当前弹窗
        // */


        static hide() {
          if (cc.isValid(this._current.popup)) {
            this._current.popup.hide();
          }
        } // /**
        // * 从缓存中获取节点
        // * @param path 弹窗路径
        // */


        static getNodeFromCache(path) {
          // // 从节点缓存中获取
          var nodeCache = this._nodeCache;

          if (nodeCache.has(path)) {
            var node = nodeCache.get(path);

            if (cc.isValid(node)) {
              return node;
            } // // 删除无效引用


            nodeCache.delete(path);
          } // // 从预制体缓存中获取


          var prefabCache = this._prefabCache;

          if (prefabCache.has(path)) {
            var prefab = prefabCache.get(path);

            if (cc.isValid(prefab)) {
              // // 增加引用计数
              prefab.addRef(); // // 实例化并返回

              return cc.instantiate(prefab);
            } // // 删除无效引用


            prefabCache.delete(path);
          } // // 无


          return null;
        } // /**
        // * 展示挂起或等待队列中的下一个弹窗
        // */


        static next() {
          if (this._current || this._suspended.length === 0 && this._queue.length === 0) {
            return;
          } // // 取出一个请求


          var request = null;

          if (this._suspended.length > 0) {
            // // 挂起队列
            request = this._suspended.shift();
          } else {
            // // 等待队列
            request = this._queue.shift();
          } // // 解除锁定


          this.locked = false; // // 已有实例

          if (cc.isValid(request.popup)) {
            // // 设为当前弹窗
            this._current = request; // // 直接展示

            request.node.setParent(this.container);
            request.popup.show(request.options);
            return;
          } // // 加载并展示


          this.show(request.path, request.options, request.params);
        } // /**
        // * 添加一个弹窗请求到等待队列中，如果当前没有展示中的弹窗则直接展示该弹窗。
        // * @param path 弹窗预制体相对路径（如：prefabs/MyPopup）
        // * @param options 弹窗选项
        // * @param params 弹窗展示参数
        // */


        static push(path, options, params) {
          // // 直接展示
          if (!this._current && !this.locked) {
            this.show(path, options, params);
            return;
          } // // 加入队列


          this._queue.push({
            path,
            options,
            params
          }); // // 按照优先级从小到大排序


          this._queue.sort((a, b) => a.params.priority - b.params.priority);
        } // /**
        // * 挂起当前展示中的弹窗
        // */


        static suspend() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (!_this2._current) {
              return;
            }

            var request = _this2._current; // // 将当前弹窗推入挂起队列

            _this2._suspended.push(request); // // @ts-ignore


            yield request.popup.onSuspended(); // // 关闭当前弹窗（挂起）

            yield request.popup.hide(true); // // 置空当前

            _this2._current = null;
          })();
        } // /**
        // * 回收弹窗
        // * @param path 弹窗路径
        // * @param node 弹窗节点
        // * @param mode 缓存模式
        // */


        static recycle(path, node, mode) {
          switch (mode) {
            // // 一次性
            case CacheMode.Once:
              {
                this._nodeCache.delete(path);

                node.destroy(); // // 释放

                this.release(path);
                break;
              }
            // // 正常

            case CacheMode.Normal:
              {
                this._nodeCache.delete(path);

                node.destroy();
                break;
              }
            // // 频繁

            case CacheMode.Frequent:
              {
                node.removeFromParent(false);

                this._nodeCache.set(path, node);

                break;
              }
          }
        } // /**
        // * 加载并缓存弹窗预制体资源
        // * @param path 弹窗路径
        // */


        static load(path) {
          return new Promise(res => {
            var prefabMap = this._prefabCache; // // 先看下缓存里有没有，避免重复加载

            if (prefabMap.has(path)) {
              var prefab = prefabMap.get(path); // // 缓存是否有效

              if (cc.isValid(prefab)) {
                res(prefab);
                return;
              } else {
                // // 删除无效引用
                prefabMap.delete(path);
              }
            } // // 动态加载


            cc.resources.load(path, (error, prefab) => {
              if (error) {
                res(null);
                return;
              } // // 缓存预制体


              prefabMap.set(path, prefab); // // 返回

              res(prefab);
            });
          });
        } // /**
        // * 尝试释放弹窗资源（注意：弹窗内部动态加载的资源请自行释放）
        // * @param path 弹窗路径
        // */


        static release(path) {
          // // 移除节点
          var nodeCache = this._nodeCache;
          var node = nodeCache.get(path);

          if (node) {
            nodeCache.delete(path);

            if (cc.isValid(node)) {
              node.destroy();
            }

            node = null;
          } // // 移除预制体


          var prefabCache = this._prefabCache;
          var prefab = prefabCache.get(path);

          if (prefab) {
            // // 删除缓存
            if (prefab.refCount <= 1) {
              prefabCache.delete(path);
            } // // 减少引用


            prefab.decRef();
            prefab = null;
          }
        } // /**
        // * 解析参数
        // * @param params 参数
        // */


        static parseParams(params) {
          if (params == undefined) {
            return new PopupParamsType();
          } // // 是否为对象


          if (Object.prototype.toString.call(params) !== '[object Object]') {
            cc.warn('[PopupManager]', '弹窗参数无效，使用默认参数');
            return new PopupParamsType();
          } // // 缓存模式


          if (params.mode == undefined) {
            params.mode = CacheMode.Normal;
          } // // 优先级


          if (params.priority == undefined) {
            params.priority = 0;
          } // // 立刻展示


          if (params.immediately == undefined) {
            params.immediately = false;
          }

          return params;
        }

      });

      PopupManager._prefabCache = new Map();
      PopupManager._nodeCache = new Map();
      PopupManager._current = null;
      PopupManager._queue = [];
      PopupManager._suspended = [];
      PopupManager.locked = false;
      PopupManager._container = null;
      PopupManager.interval = 0.05;
      PopupManager.loadStartCallback = null;
      PopupManager.loadFinishCallback = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8a693d45d6dcb291de34a52ac7a39f20bb3c9873.js.map