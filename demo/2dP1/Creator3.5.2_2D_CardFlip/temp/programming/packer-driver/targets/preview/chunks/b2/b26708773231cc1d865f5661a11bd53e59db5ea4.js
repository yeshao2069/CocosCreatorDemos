System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, EventManager, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7cf6diX//1L45BRBZxjpzab", "EventManager", undefined);

      _export("default", EventManager = class EventManager {
        // /**
        // * 普通事件容器
        // */
        // /**
        // * 一次性事件容器
        // */
        // /**
        // * 注册事件
        // * @param name 事件名
        // * @param callback 回调
        // * @param target 目标
        // */
        static on(name, callback, target) {
          var events = this.events;

          if (!events.has(name)) {
            events.set(name, [{
              callback,
              target
            }]);
            return;
          }

          events.get(name).push({
            callback,
            target
          });
        } // /**
        // * 注册事件（一次性）
        // * @param name 事件名
        // * @param callback 回调
        // * @param target 目标
        // */


        static once(name, callback, target) {
          var events = this.onceEvents;

          if (!events.has(name)) {
            events.set(name, [{
              callback,
              target
            }]);
            return;
          }

          events.get(name).push({
            callback,
            target
          });
        } // /**
        // * 取消注册事件
        // * @param name 事件名
        // * @param callback 回调
        // * @param target 目标
        // */


        static off(name, callback, target) {
          // // 普通事件
          var event = this.events.get(name);

          if (event) {
            for (var i = 0, l = event.length; i < l; i++) {
              if (this.compare(event[i], callback, target)) {
                event.splice(i, 1);

                if (event.length === 0) {
                  this.events.delete(name);
                }

                break;
              }
            }
          } // // 一次性事件


          var onceEvent = this.onceEvents.get(name);

          if (onceEvent) {
            for (var _i = 0, _l = onceEvent.length; _i < _l; _i++) {
              if (this.compare(onceEvent[_i], callback, target)) {
                onceEvent.splice(_i, 1);

                if (onceEvent.length === 0) {
                  this.onceEvents.delete(name);
                }

                break;
              }
            }
          }
        } // /**
        // * 通过事件名发送事件
        // * @param name 事件名
        // * @param args 参数
        // */


        static emit(name) {
          // // 普通事件
          var event = this.events.get(name);

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (event) {
            for (var i = 0; i < event.length; i++) {
              var {
                callback,
                target
              } = event[i];
              callback.apply(target, args);
            }
          } // // 一次性事件


          var onceEvent = this.onceEvents.get(name);

          if (onceEvent) {
            for (var _i2 = 0; _i2 < onceEvent.length; _i2++) {
              var {
                callback: _callback,
                target: _target
              } = onceEvent[_i2];

              _callback.apply(_target, args);
            }

            this.onceEvents.delete(name);
          }
        } // /**
        // * 移除指定事件
        // * @param name 事件名
        // */


        static remove(name) {
          // // 普通事件
          if (this.events.has(name)) {
            this.events.delete(name);
          } // // 一次性事件


          if (this.onceEvents.has(name)) {
            this.onceEvents.delete(name);
          }
        } // /**
        // * 移除所有事件
        // */


        static removeAll() {
          // // 普通事件
          this.events.clear(); // // 一次性事件

          this.onceEvents.clear();
        } // /**
        // * 对比
        // * @param subscription 订阅
        // * @param inCallback 回调
        // * @param inTarget 目标
        // */


        static compare(subscription, inCallback, inTarget) {
          var {
            callback,
            target
          } = subscription;
          return target === inTarget && (callback === inCallback || callback.toString() === inCallback.toString());
        }

      });
      /**
       * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
       */
      // /**
      //  * 事件管理器
      //  * @see EventManager.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/EventManager.ts
      //  * @version 20210421
      //  * @example
      //  * // 注册事件
      //  * EventManager.on('game-start', this.onGameStart, this);
      //  * // 发射事件
      //  * EventManager.emit('game-start', 666);
      //  */
      // export default class EventManager {
      // 
      //     /**
      //      * 普通事件容器
      //      */
      //     private static events: Map<string, Subscription[]> = new Map<string, Subscription[]>();
      // 
      //     /**
      //      * 一次性事件容器
      //      */
      //     private static onceEvents: Map<string, Subscription[]> = new Map<string, Subscription[]>();
      // 
      //     /**
      //      * 注册事件
      //      * @param name 事件名
      //      * @param callback 回调
      //      * @param target 目标
      //      */
      //     public static on(name: string, callback: Function, target?: any) {
      //         const events = this.events;
      //         if (!events.has(name)) {
      //             events.set(name, [{ callback, target }]);
      //             return;
      //         }
      //         events.get(name).push({ callback, target });
      //     }
      // 
      //     /**
      //      * 注册事件（一次性）
      //      * @param name 事件名
      //      * @param callback 回调
      //      * @param target 目标
      //      */
      //     public static once(name: string, callback: Function, target?: any) {
      //         const events = this.onceEvents;
      //         if (!events.has(name)) {
      //             events.set(name, [{ callback, target }]);
      //             return;
      //         }
      //         events.get(name).push({ callback, target });
      //     }
      // 
      //     /**
      //      * 取消注册事件
      //      * @param name 事件名
      //      * @param callback 回调
      //      * @param target 目标
      //      */
      //     public static off(name: string, callback: Function, target?: any) {
      //         // 普通事件
      //         const event = this.events.get(name);
      //         if (event) {
      //             for (let i = 0, l = event.length; i < l; i++) {
      //                 if (this.compare(event[i], callback, target)) {
      //                     event.splice(i, 1);
      //                     if (event.length === 0) {
      //                         this.events.delete(name);
      //                     }
      //                     break;
      //                 }
      //             }
      //         }
      //         // 一次性事件
      //         const onceEvent = this.onceEvents.get(name);
      //         if (onceEvent) {
      //             for (let i = 0, l = onceEvent.length; i < l; i++) {
      //                 if (this.compare(onceEvent[i], callback, target)) {
      //                     onceEvent.splice(i, 1);
      //                     if (onceEvent.length === 0) {
      //                         this.onceEvents.delete(name);
      //                     }
      //                     break;
      //                 }
      //             }
      //         }
      //     }
      // 
      //     /**
      //      * 通过事件名发送事件
      //      * @param name 事件名
      //      * @param args 参数
      //      */
      //     public static emit(name: string, ...args: any[]) {
      //         // 普通事件
      //         const event = this.events.get(name);
      //         if (event) {
      //             for (let i = 0; i < event.length; i++) {
      //                 const { callback, target } = event[i];
      //                 callback.apply(target, args);
      //             }
      //         }
      //         // 一次性事件
      //         const onceEvent = this.onceEvents.get(name);
      //         if (onceEvent) {
      //             for (let i = 0; i < onceEvent.length; i++) {
      //                 const { callback, target } = onceEvent[i];
      //                 callback.apply(target, args);
      //             }
      //             this.onceEvents.delete(name);
      //         }
      //     }
      // 
      //     /**
      //      * 移除指定事件
      //      * @param name 事件名
      //      */
      //     public static remove(name: string) {
      //         // 普通事件
      //         if (this.events.has(name)) {
      //             this.events.delete(name);
      //         }
      //         // 一次性事件
      //         if (this.onceEvents.has(name)) {
      //             this.onceEvents.delete(name);
      //         }
      //     }
      // 
      //     /**
      //      * 移除所有事件
      //      */
      //     public static removeAll() {
      //         // 普通事件
      //         this.events.clear();
      //         // 一次性事件
      //         this.onceEvents.clear();
      //     }
      // 
      //     /**
      //      * 对比
      //      * @param subscription 订阅
      //      * @param inCallback 回调
      //      * @param inTarget 目标
      //      */
      //     private static compare(subscription: Subscription, inCallback: Function, inTarget: any) {
      //         const { callback, target } = subscription;
      //         return target === inTarget && (callback === inCallback || callback.toString() === inCallback.toString());
      //     }
      // 
      // }
      // 
      // /** 订阅 */
      // interface Subscription {
      //     /** 回调 */
      //     callback: Function;
      //     /** 目标 */
      //     target: any;
      // }


      EventManager.events = new Map();
      EventManager.onceEvents = new Map();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b26708773231cc1d865f5661a11bd53e59db5ea4.js.map