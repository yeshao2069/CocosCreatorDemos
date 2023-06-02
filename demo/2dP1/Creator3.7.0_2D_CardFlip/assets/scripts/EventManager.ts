/**
* 事件管理器
* @version 20210421
* @example
* // 注册事件
* EventManager.on('game-start', this.onGameStart, this);
* // 发射事件
* EventManager.emit('game-start', 666);
*/

import { _decorator } from 'cc';
interface Subscription {
    callback: Function;
    target: any;
}

export default class EventManager {
    /**
    * 普通事件容器
    */
    private static events: Map<string, Subscription[]> = new Map<string, Subscription[]>();
    /**
    * 一次性事件容器
    */
    private static onceEvents: Map<string, Subscription[]> = new Map<string, Subscription[]>();
    /**
    * 注册事件
    * @param name 事件名
    * @param callback 回调
    * @param target 目标
    */
    public static on(name: string, callback: Function, target?: any) {
        const events = this.events;
        if (!events.has(name)) {
        events.set(name, [{ callback, target }]);
        return;
        }
        events.get(name).push({ callback, target });
    }
    /**
    * 注册事件（一次性）
    * @param name 事件名
    * @param callback 回调
    * @param target 目标
    */
    public static once(name: string, callback: Function, target?: any) {
        const events = this.onceEvents;
        if (!events.has(name)) {
        events.set(name, [{ callback, target }]);
        return;
        }
        events.get(name).push({ callback, target });
    }
    /**
    * 取消注册事件
    * @param name 事件名
    * @param callback 回调
    * @param target 目标
    */
    public static off(name: string, callback: Function, target?: any) {
        // 普通事件
        const event = this.events.get(name);
        if (event) {
            for (let i = 0, l = event.length; i < l; i++) {
                if (this.compare(event[i], callback, target)) {
                    event.splice(i, 1);
                    if (event.length === 0) {
                        this.events.delete(name);
                    }
                    break;
                }
            }
        }
        // 一次性事件
        const onceEvent = this.onceEvents.get(name);
        if (onceEvent) {
            for (let i = 0, l = onceEvent.length; i < l; i++) {
                if (this.compare(onceEvent[i], callback, target)) {
                    onceEvent.splice(i, 1);
                    if (onceEvent.length === 0) {
                        this.onceEvents.delete(name);
                    }
                    break;
                }
            }
        }
    }
    /**
    * 通过事件名发送事件
    * @param name 事件名
    * @param args 参数
    */
    public static emit(name: string, ...args: any[]) {
        // 普通事件
        const event = this.events.get(name);
        if (event) {
            for (let i = 0; i < event.length; i++) {
                const { callback, target } = event[i];
                callback.apply(target, args);
            }
        }
        // 一次性事件
        const onceEvent = this.onceEvents.get(name);
        if (onceEvent) {
            for (let i = 0; i < onceEvent.length; i++) {
                const { callback, target } = onceEvent[i];
                callback.apply(target, args);
            }
            this.onceEvents.delete(name);
        }
    }
    /**
    * 移除指定事件
    * @param name 事件名
    */
    public static remove(name: string) {
        // 普通事件
        if (this.events.has(name)) {
            this.events.delete(name);
        }
        // 一次性事件
        if (this.onceEvents.has(name)) {
            this.onceEvents.delete(name);
        }
    }

    /**
    * 移除所有事件
    */
    public static removeAll() {
        // 普通事件
        this.events.clear();
        // 一次性事件
        this.onceEvents.clear();
    }

    /**
    * 对比
    * @param subscription 订阅
    * @param inCallback 回调
    * @param inTarget 目标
    */
    private static compare(subscription: Subscription, inCallback: Function, inTarget: any) {
        const { callback, target } = subscription;
        return target === inTarget && (callback === inCallback || callback.toString() === inCallback.toString());
    }
}