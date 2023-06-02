/**
* Promise 工具
* @author 陈皮皮 (ifaswind)
* @version 20210925
*/

import { Component, _decorator } from 'cc';
export default class PromiseUtil {
    /**
    * 等待
    * @param time 时长（秒）
    * @example
    * await PromiseUtil.sleep(1);
    */
    public static sleep(time: number): Promise<void> {
        return new Promise(res => new Component().scheduleOnce(res, time));
    }
}