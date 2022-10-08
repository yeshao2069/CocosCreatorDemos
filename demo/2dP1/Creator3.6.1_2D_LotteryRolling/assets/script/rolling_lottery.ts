import { bezier_curve } from "./bezier_curve";
import { _decorator, Component, EventHandler, Enum, Vec2, find, Graphics, UITransform, Color, Rect, rect, Layout, warn, error, Node } from 'cc';
const {ccclass, property} = _decorator;

module _rolling_lottery {
    /**移动方向 */
    export enum move_dire {
        UP,
        DOWN,
    }
    export interface action {
        /**运动曲线 */
        bezier_o: bezier_curve;
        /**运动距离 */
        dist_n: number;
    }
    @ccclass("callback")
    export class callback {
        /**触发状态 */
        public trigger_b = false;
        
        @property({ displayName: "回调", type: EventHandler })
        callback_o !: EventHandler;
        @property({ displayName: "提前检测距离", min: 0 })
        check_dist_n = 0;
    }
}

/**滚动抽奖 */
@ccclass('rolling_lottery')
export class rolling_lottery extends Component {
    /**当前速度（距离/s） */
    private curr_speed_n: number = 0;
    /**当前距离 */
    private curr_dist_n = 0;
    /**步长时间 */
    private step_time_s_n = 0.01;
    /**当前时间 */
    private curr_time_s_n = 0;
    /**单圈长度 */
    private lap_len_n: number = 0;
    /**配置数据 */
    private config_o: rolling_lottery_config.config = null!;
    /**动作列表 */
    private action_as: _rolling_lottery.action[] = [];
    /**当前动作下标 */
    private curr_action_n: number = 0;
    /**滚动动作 */
    private scroll_action_a: _rolling_lottery.action = null!;
    /**反弹动作 */
    private rebound_action_a: _rolling_lottery.action = null!;
    /**运动距离 */
    private move_dist_n: number = 0;
    /**上次所在格子下标 */
    private last_pos_n: number = 0;
    /**滚动状态 */
    public scroll_b = false;

    // 每个格子高度
    private itemHeight = 130;
    // 格子数
    private itemNum = 8;
    // 当前的随机数
    private currRand : number = 0;

    /* ***************属性*************** */
    @property({ displayName: "旋转方向", type: Enum(_rolling_lottery.move_dire) })
    move_dire_e = _rolling_lottery.move_dire.DOWN;
    @property({ displayName: "最大速度（距离/s）", min: 0.1 })
    max_speed_n = 50;
    @property({
        displayName: "转动圈数",
        min: 0,
        step: 1,
    })
    turn_lap_n = 10;
    @property({
        displayName: "转动随机圈数",
        min: 0,
        step: 1,
    })
    turn_lap_random_n = 0;
    @property({ displayName: "惯性随机距离", min: 0 })
    inertia_n = 50;
    @property({
        displayName: "滚动动作曲线",
        tooltip: "贝塞尔曲线控制点，可点击组件右上角->帮助文档进行跳转编辑",
        type: [Vec2],
    })
    scroll_action_os: Vec2[] = [new Vec2(0, 0), new Vec2(0.44, 0.8925), new Vec2(0.375, 0.25), new Vec2(0.75, 0.75), new Vec2(1, 0.05)];
    @property({
        displayName: "反弹动作曲线",
        tooltip: "贝塞尔曲线控制点，可点击组件右上角->帮助文档进行跳转编辑",
        type: [Vec2],
        visible: function() {
            // @ts-ignore
            return this.inertia_n > 0;
        }
    })
    rebound_action_os: Vec2[] = [new Vec2(0, -0.05), new Vec2(0.5, -0.02), new Vec2(1, 0)];
    /**滚动结束回调 */
    @property({ displayName: "滚动结束回调", type: [_rolling_lottery.callback] })
    scorll_finish_cb_os: _rolling_lottery.callback[] = [];
    /**反弹结束回调 */
    @property({
        displayName: "反弹结束回调",
        type: [_rolling_lottery.callback],
        visible: function () {
            // @ts-ignore
            return this.inertia_n > 0;
        }
    })
    rebound_finish_cb_os: _rolling_lottery.callback[] = [];
    /**滚动单格回调 */
    @property({ displayName: "滚动单格回调", type: [EventHandler] })
    scroll_grid_cb_os: EventHandler[] = [];
    /**滚动单格回调补全（例：一格距离5，滚动10调用2次回调而非1次） */
    @property({
        displayName: "滚动单格回调补全",
        tooltip: "例：一格距离5，滚动10调用2次回调而非1次",
        visible: function () { 
            // @ts-ignore
            return this.scroll_grid_cb_os.length > 0;
        }
    })
    scroll_grid_cb_supp_b = true;
    
    onLoad() {
        // 滚动
        this.action_as.push(this.scroll_action_a = {
            "bezier_o": new bezier_curve(this.scroll_action_os),
            "dist_n": 0,
        });
        // 反弹
        if (this.inertia_n > 0) {
            this.action_as.push(this.rebound_action_a = {
                "bezier_o": new bezier_curve(this.rebound_action_os),
                "dist_n": 0,
            });
        }
        const debug_b = false;
        if (!debug_b) {
            return;
        }

        let uitransWidth = find("Canvas")!.getComponent(UITransform)!.width;
        let uitransHeight = find("Canvas")!.getComponent(UITransform)!.height;
        let bezier_o = this.action_as[0].bezier_o;
        let point_os: Vec2[] = [];
        let graphics_o = find("Canvas")!.getComponent(Graphics) || find("Canvas")!.addComponent(Graphics);
        let start_b = false;
        let offset_o = new Vec2(-uitransWidth / 2 + 100, -uitransHeight / 2 + 100);
        let scale_n = 100;
        for (let i = 0; i <= 1; i += 0.1) {
            point_os.push(bezier_o.point(i));
        }

        // ------------------绘制曲线线段
        graphics_o.strokeColor = Color.WHITE;
        point_os.forEach(v1_o => {
            if (!start_b) {
                start_b = true;
                graphics_o.moveTo(v1_o.x * scale_n + offset_o.x, v1_o.y * scale_n + offset_o.y);
            } else {
                graphics_o.lineTo(v1_o.x * scale_n + offset_o.x, v1_o.y * scale_n + offset_o.y);
            }
        });
        graphics_o.stroke();
        // ------------------绘制控制点
        graphics_o.fillColor = Color.RED;
        bezier_o.control_point_os.forEach(v1_o => {
            graphics_o.circle(v1_o.x * scale_n + offset_o.x, v1_o.y * scale_n + offset_o.y, 5);
            graphics_o.fill();
        });
        graphics_o.stroke();
    }

    public set currentRand(rand: number) {
        this.currRand = rand;
    }
    get currentRand () {
        return this.currRand;
    }

    update(dt_n_: number) {
        if (!this.scroll_b) {
            return;
        }

        let curr_action_a = this.action_as[this.curr_action_n];
        if ((curr_action_a.dist_n > 0 && this.curr_dist_n < curr_action_a.dist_n) || 
            (curr_action_a.dist_n < 0 && this.curr_dist_n > curr_action_a.dist_n))
        {
            this.curr_time_s_n += dt_n_;
            if (this.curr_time_s_n >= this.step_time_s_n) {
                this.curr_time_s_n -= this.step_time_s_n;
                /**距离比例 */
                let dist_scale_n = Math.round(this.curr_dist_n / Math.abs(curr_action_a.dist_n) * 100) / 100;
                /**当前t的曲线坐标y */
                let y_n = curr_action_a.bezier_o.point(dist_scale_n).y;
                // ------------------防止0停止运动
                if (y_n === 0) {
                    let pre_o = curr_action_a.bezier_o.point(dist_scale_n - 0.01);
                    let next_o = curr_action_a.bezier_o.point(dist_scale_n + 0.01);
                    y_n = next_o.y;
                    if (y_n === 0) {
                        y_n = pre_o.y >= 0 ? 0.01 : -0.01;
                    }
                }
                this.curr_speed_n = this.max_speed_n * y_n;
                if ((this.curr_dist_n + Math.abs(this.curr_speed_n)) > curr_action_a.dist_n) {
                    this.curr_speed_n = curr_action_a.dist_n - this.curr_dist_n;
                }
                this.curr_dist_n += Math.abs(this.curr_speed_n);
                if (this.move_dire_e === _rolling_lottery.move_dire.DOWN) {
                    this.curr_speed_n = -this.curr_speed_n;
                }
                this.scrolling();
                this.update_move_dist(this.curr_speed_n);
            }
        }
        // ------------------动作执行完成，自动执行下个动作
        else if (this.curr_action_n < this.action_as.length - 1) {
            ++this.curr_action_n;
            this.curr_dist_n = 0;
            this.update(0);
        }
        // ------------------所有动作执行完成
        else {
            this.scroll_b = false;
        }

        switch (curr_action_a) {
            // 滚动
            case this.scroll_action_a: {
                // ------------------结束回调
                if (this.config_o.scroll_finish_cb_f /**&& (this.curr_dist_n + this.config_o.scorll_trigger_dist_n!) >= curr_action_a.dist_n**/) {
                    this.config_o.scroll_finish_cb_f();
                    this.config_o.scroll_finish_cb_f = null!;
                }
                this.scorll_finish_cb_os.forEach( v1_o => {
                    if (!v1_o.trigger_b && (this.curr_dist_n + v1_o.check_dist_n) >= curr_action_a.dist_n) {
                        v1_o.callback_o.emit([v1_o.callback_o.customEventData]);
                        v1_o.trigger_b = true;
                    }
                });

                break;
            } 
            // 反弹
            case this.rebound_action_a: {
                // ------------------结束回调
                if (this.config_o.rebound_finish_cb_f /**&& (this.curr_dist_n + this.config_o.rebound_trigger_dist_n!) >= curr_action_a.dist_n**/) {
                    this.config_o.rebound_finish_cb_f();
                    this.config_o.rebound_finish_cb_f = null!;
                }
                this.rebound_finish_cb_os.forEach( v1_o => {
                    console.log(!v1_o.trigger_b && (this.curr_dist_n + v1_o.check_dist_n) >= curr_action_a.dist_n);
                    console.log(!v1_o.trigger_b );
                    console.log((this.curr_dist_n + v1_o.check_dist_n) >= curr_action_a.dist_n);
                    if (!v1_o.trigger_b && (this.curr_dist_n + v1_o.check_dist_n) >= curr_action_a.dist_n) {
                        v1_o.callback_o.emit([v1_o.callback_o.customEventData]);
                        v1_o.trigger_b = true;
                    }
                });

                break;
            }
        }
    }

    /* ***************功能函数*************** */
    /**获取在世界坐标系下的节点包围盒(不包含自身激活的子节点范围) */
    private get_bounding_box_to_world(node_o: any): Rect {
        let w_n: number = node_o.getComponent(UITransform)!.width;
        let h_n: number = node_o.getComponent(UITransform)!.height;
        let rect_o = rect(
            node_o.getComponent(UITransform).anchorX * w_n,
            node_o.getComponent(UITransform).anchorY * h_n,
            w_n, 
            h_n
        );
        node_o.updateWorldTransform();
        rect_o.transformMat4(node_o.worldMatrix);

        return rect_o;
    }

    /**检测碰撞 */
    private _check_collision (node_o: Node): boolean {
        let rect1_o = this.get_bounding_box_to_world(this.node);
        let rect2_o = this.get_bounding_box_to_world(node_o);
        // ------------------保险范围
        rect1_o.width += rect1_o.width * 0.5;
        rect1_o.height += rect1_o.height * 0.5;
        rect1_o.x -= rect1_o.width * 0.25;
        rect1_o.y -= rect1_o.height * 0.25;
        return rect1_o.intersects(rect2_o);
    }

    /**重置 */
    private _reset(): void {
        // ------------------重置数据
        this.last_pos_n = undefined!;
        this.curr_dist_n = 0;
        this.move_dist_n = 0;
        this.curr_time_s_n = 0;
        this.curr_action_n = 0;

        this.action_as.forEach(v1_a => {
            v1_a.dist_n = 0;
        });
        this.scorll_finish_cb_os.forEach(v1_o => {
            v1_o.trigger_b = false;
        });
        this.rebound_finish_cb_os.forEach(v1_o => {
            v1_o.trigger_b = false;
        });
    }

    /**更新运动距离 */
    private update_move_dist(dist_n: number): void {
        if (!this.config_o.scroll_grid_cb_f) {
            return;
        }
        this.move_dist_n += Math.abs(dist_n);
        /**当前所在格子 */
        let curr_pos_n = Math.floor(this.move_dist_n / this.lap_len_n) * this.node.children.length;
        /**整除单圈长度后的剩余距离 */
        let dist_n_ = this.move_dist_n % this.lap_len_n;
        for (let k1_n = 0; k1_n < this.node.children.length; ++k1_n) {
            if ((dist_n_ -= this.node.children[k1_n].getComponent(UITransform)!.height) <= 0) {
                curr_pos_n += k1_n;
                break;
            }
        }
        // ------------------执行回调
        if (this.last_pos_n !== undefined && curr_pos_n !== this.last_pos_n) {
            if (this.config_o.scroll_grid_cb_supp_b) {
                let for_n = Math.abs(this.last_pos_n - curr_pos_n);
                for (; for_n--; ){
                    this.config_o.scroll_grid_cb_f();
                }
            } else {
                this.config_o.scroll_grid_cb_f();
            }
            if (this.scroll_grid_cb_supp_b) {
                let for_n = Math.abs(this.last_pos_n - curr_pos_n);
                for (; for_n--;){
                    this.scroll_grid_cb_os.forEach( v1_o => {
                        v1_o.emit([ v1_o.customEventData ]);
                    });
                }
            } else {
                this.scroll_grid_cb_os.forEach( v1_o => {
                    v1_o.emit([ v1_o.customEventData ]);
                });
            }
        }
        this.last_pos_n = curr_pos_n;
    }

    /**计算运动距离 */
    private comp_move_dist(index_n: number): number {
        /**距离 */
        let dist_y_n = 0;
        if (this.move_dire_e === _rolling_lottery.move_dire.UP) {
            dist_y_n = index_n * this.itemHeight;
        } else {
            let index = this.itemNum - index_n;
            dist_y_n = index * this.itemHeight;
        }
        return dist_y_n;
    }

    /**
     * 重置
     * - 重置布局，在更新子节点后调用
     */
    public reset(): void {
        // ------------------重置布局
        let old_h_n = this.node.getComponent(UITransform)!.height;
        let layout_o = this.node.getComponent(Layout)!;
        layout_o.enabled = true;
        layout_o.updateLayout(true);
        // layout_o.enabled = false;
        this.node.getComponent(UITransform)!.height = old_h_n;
        this.lap_len_n = 0;
        this.node.children.forEach(v1_o=> {
            this.lap_len_n += v1_o.getComponent(UITransform)!.height;
        });
        this._reset();
    }

    /**
     * 随机子节点顺序（打乱）
     */
    public random_order(): void {
        if (this.scroll_b) {
            warn("忙碌");
            return;
        }
        let children_os = [];
        children_os.push(...this.node.children);
        this.node.removeAllChildren();
        while (children_os.length) {
            this.node.addChild(children_os.splice(Math.floor(Math.random() * children_os.length), 1)[0]);
        }
        this.reset();
    }

    /**
     * 滚动
     * @param index_n 目标位置
     */
    public scroll(index_n: number, config_o?: rolling_lottery_config.config): void {
        if (index_n >= this.node.children.length) {
            error("目标位置错误");
            return;
        }
        if (this.scroll_b) {
            error("忙碌");
            return;
        }
        this.config_o = new rolling_lottery_config.config(config_o);
        this._reset();
        /**运动距离 */
        const move1 = this.comp_move_dist(this.itemNum - this.currRand);
        const move2 = this.comp_move_dist(index_n);
        const move_dist_n = move1 + move2;
        this.currRand = index_n;
        console.log("aaaa, ", move_dist_n);
        // 惯性距离
        this.rebound_action_a.dist_n = this.inertia_n;
        // 滚动距离
        this.scroll_action_a.dist_n = this.lap_len_n * (this.turn_lap_n + Math.floor(Math.random() * this.turn_lap_random_n)) + move_dist_n + this.rebound_action_a.dist_n;
        this.scroll_b = true;
    }

    /**
     * 立即跳转到指定item
     * @param index_n_ 默认随机子节点下标
     */
    public jump(index_n_ = Math.floor(Math.random() * (this.node.children.length + 1))): void {
        /**运动距离 */
        let move_dist_n = this.comp_move_dist(index_n_);
        this.curr_speed_n = this.scroll_action_a.dist_n = move_dist_n;
        this.scrolling();
    }

    /* ***************其他事件*************** */
    private scrolling(): void {
        /** 实际顶部y */
        const top_y_n = this.itemHeight * 2;
        /** 实际底部y */
        const bottom_y_n = this.itemHeight * (this.itemNum + 2);
        /** 视图顶部y */
        const top_view_y_n = this.itemHeight * 2;
        /** 视图底部y */
        const bottom_view_y_n = this.itemHeight * (this.itemNum + 2);
        // ------------------向上滚动
        if (this.curr_speed_n > 0) {
            let temp1_n: number;
            this.node.children.forEach(v1_o => {
                let v1_o_pos = v1_o.getPosition();
                v1_o_pos.y += this.curr_speed_n;
                if (v1_o_pos.y > top_view_y_n && !this._check_collision(v1_o)) {
                    temp1_n = (v1_o_pos.y - top_y_n) % this.lap_len_n;
                    v1_o_pos.y = bottom_y_n + temp1_n;
                }
                v1_o.setPosition(v1_o_pos);
            });
        }
        // ------------------向下滚动
        else if (this.curr_speed_n < 0) {
            let temp1_n: number;
            this.node.children.forEach(v1_o => {
                let v1_o_pos = v1_o.getPosition();
                v1_o_pos.y += this.curr_speed_n;
                if (v1_o_pos.y < bottom_view_y_n && !this._check_collision(v1_o)) {
                    temp1_n = (bottom_y_n - v1_o_pos.y) % this.lap_len_n;
                    v1_o_pos.y = top_y_n - temp1_n;
                }
                v1_o.setPosition(v1_o_pos);
            });
        }
    }
}

module rolling_lottery_config {
    /**移动方向 */
    export const move_dire = _rolling_lottery.move_dire;
    /**配置 */
    export class config {
        constructor(init_conf?: config) {
            if (init_conf) {
                Object.assign(this, init_conf);
            }
        }
        /**滚动结束回调 */
        scroll_finish_cb_f?: ()=> void;
        /**滚动回调提前检测距离 */
        scorll_trigger_dist_n ?= 0;
        /**反弹结束回调 */
        rebound_finish_cb_f?: ()=> void;
        /**反弹回调提前检测距离 */
        rebound_trigger_dist_n ?= 0;
        /**滚动单格回调 */
        scroll_grid_cb_f?: ()=> void;
        /**滚动单格补全（例：一格距离5，滚动10调用2次回调而非1次） */
        scroll_grid_cb_supp_b ?= true;
    }
}