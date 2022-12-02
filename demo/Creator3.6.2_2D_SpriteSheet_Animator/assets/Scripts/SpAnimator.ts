/*
 * @Descripttion: 
 * @version: 
 * @Author: iwae
 * @Date: 2022-07-16 20:48:08
 * @LastEditors: iwae
 * @LastEditTime: 2022-07-17 20:23:09
 */

import { _decorator, Sprite, SpriteFrame, CCInteger, Vec2, UITransform } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode, menu, disallowMultiple, executionOrder } = _decorator;

@ccclass('anm')
export class anm {
    @property({ type: CCInteger, displayOrder: 0, displayName: "Start Frame" })
    start: number = 0;
    @property({ type: CCInteger, displayOrder: 0, displayName: "End Frame" })
    end: number = 10;
    @property({ type: CCInteger, min: 1, displayOrder: 1, displayName: "Num Tiles X" })
    x: number = 1;
    @property({ type: CCInteger, min: 1, displayOrder: 1, displayName: "Num Tiles Y" })
    y: number = 1;
    @property({ min: 0.001, displayName: "Frame time" })
    frame: number = 0.05;
    @property({ type: SpriteFrame })
    sp: SpriteFrame = null;
    @property({ displayName: "Loop Play" })
    loop: boolean = true;
}

@ccclass('Sprite Sheet Animator')
@menu("2D/Sprite Sheet Animator")
@disallowMultiple(true)
@executionOrder(109)
@executeInEditMode
export class SpAnimator extends Sprite {

    @property({ type: anm })
    anms: anm[] = [];

    /**
     * @EN get current animation state
     */
    @property({ type: CCInteger, serializable: true, override: true })
    get defaultAnm() {
        return this._currentAnm;
    }
    set defaultAnm(v) {
        this._currentAnm = v;
        this.setAnmSize(v);
        if (this._editorPlaying) {
            this.playNewAnm();
        }
    }

    @property({ serializable: true, visible: false })
    private _currentAnm = 0;

    /**
     * @EN set if play on load in runtime
     */
    @property
    playOnLoad: boolean = true;

    @property
    get playInEditor() {
        return this._editorPlaying
    }

    set playInEditor(v) {
        this._editorPlaying = v;
        if (this._editorPlaying) {
            this.playNewAnm();
        } else {
            this.stop()
        }
    }

    @property({ serializable: true, visible: false })
    private _editorPlaying = false;

    private anmFrame = 0.05

    private startFrame = 0;

    private endFrame = 10;

    private frame = 0;

    private _offset = 0;

    private _size = new Vec2();

    /**
    * @EN get the state of current animation
    */
    get Anmimation(): number {
        return this._currentAnm;
    }
    /**
    * @EN set the state of current animation
    */
    set Anmimation(v: number) {
        this._currentAnm = v;
        this.playNewAnm();
    }
    /**
    * @EN get the duration of current animation's length
    */
    get duration(): number {
        const anm = this.anms[this._currentAnm];
        const time = anm.frame * (anm.end - anm.start);
        return time;

    }

    onEnable() {

        this.trim = true;
        this.setAnmSize(0);
        if (!EDITOR) {
            this._offset = 0;
        }
        if (this.playOnLoad || this.playInEditor) {
            this.playNewAnm();
        }

    }
    /**
    * @EN it can be used to resume animaton's play as well;
    */
    public play() {
        this.schedule(this.playAnm, this.anmFrame)
    }

    public stop() {
        this.unschedule(this.playAnm)
    }

    private playAnm() {
        if (this.frame > this.endFrame) {
            /* stop the anm if it is not loop play */
            if (!this.anms[this._currentAnm].loop) {
                this.stop();
                return;
            }

            this.frame = this.startFrame;
        };
        this.updateRect(this.frame);
        this.frame++;

    }

    private playNewAnm() {
        this.stop();
        this.setAnmSize(this._currentAnm);
    }

    private setAnmSize(index: number) {
        const anm = this.anms[index];
        if (!anm) {
            this.stop();
            console.error("animation_" + index + " not exist")
            return;
        }
        if (!anm.sp) {
            this.stop();
            console.error("animation_" + index + " has not spriteframe")
            return;
        }

        if (anm.end < anm.start) {
            this.stop();
            console.error("animation_" + index + " end frame should be greater than start frame")
            return;
        }

        this.startFrame = this.frame = anm.start;
        this.endFrame = anm.end;
        this.anmFrame = anm.frame;
        if (this.spriteFrame != anm.sp) this.spriteFrame = anm.sp;
        this._size.x = anm.sp.texture.width / anm.x;
        this._size.y = anm.sp.texture.height / anm.y;
        this.spriteFrame.rect.width = this._size.x;
        this.spriteFrame.rect.height = this._size.y;
        this.node.getComponent(UITransform).setContentSize(this._size.x, this._size.y);
        this.recalculateUV();
        this._assembler.updateUVs(this)
        this.playAnm();
        this.play();
    }

    /**
     * @EN update spriteframe's rect
     */
     protected updateRect(frame: number) {
        const tileX = this.anms[this._currentAnm].x;
        this.spriteFrame.rect.x = this._offset + (frame % tileX) * this._size.x;
        this.spriteFrame.rect.y = 0 + Math.floor(frame / tileX) * this._size.y;

        console.log(this.spriteFrame.rect);
        /* _calculateUV can be used as well, if you dont want to hack */
        // this.spriteFrame._calculateUV();
        this.recalculateUV();
        /* inform assembler update UVs */
        this._assembler.updateUVs(this);
    }
    /**
     * @EN calculate spriteframe's uv 
     */
    private recalculateUV() {
        const sf: any = this.spriteFrame
        const rect = sf.rect;
        const uv = sf.uv;
        const tex = sf.texture;
        const texw = tex.width;
        const texh = tex.height;

        if (sf._rotated) {
            const l = texw === 0 ? 0 : rect.x / texw;
            const r = texw === 0 ? 1 : (rect.x + rect.height) / texw;
            const t = texh === 0 ? 0 : rect.y / texh;
            const b = texh === 0 ? 1 : (rect.y + rect.width) / texh;

            if (sf._isFlipUVX && sf._isFlipUVY) {
                /*
                3 - 1
                |   |
                2 - 0
                */
                uv[0] = r;
                uv[1] = b;
                uv[2] = r;
                uv[3] = t;
                uv[4] = l;
                uv[5] = b;
                uv[6] = l;
                uv[7] = t;
            } else if (sf._isFlipUVX) {
                /*
                2 - 0
                |   |
                3 - 1
                */
                uv[0] = r;
                uv[1] = t;
                uv[2] = r;
                uv[3] = b;
                uv[4] = l;
                uv[5] = t;
                uv[6] = l;
                uv[7] = b;
            } else if (sf._isFlipUVY) {
                /*
                1 - 3
                |   |
                0 - 2
                */
                uv[0] = l;
                uv[1] = b;
                uv[2] = l;
                uv[3] = t;
                uv[4] = r;
                uv[5] = b;
                uv[6] = r;
                uv[7] = t;
            } else {
                /*
                0 - 2
                |   |
                1 - 3
                */
                uv[0] = l;
                uv[1] = t;
                uv[2] = l;
                uv[3] = b;
                uv[4] = r;
                uv[5] = t;
                uv[6] = r;
                uv[7] = b;
            }

        } else {
            const l = texw === 0 ? 0 : rect.x / texw;
            const r = texw === 0 ? 1 : (rect.x + rect.width) / texw;
            const b = texh === 0 ? 1 : (rect.y + rect.height) / texh;
            const t = texh === 0 ? 0 : rect.y / texh;
            if (sf._isFlipUVX && sf._isFlipUVY) {
                /*
                1 - 0
                |   |
                3 - 2
                */
                uv[0] = r;
                uv[1] = t;
                uv[2] = l;
                uv[3] = t;
                uv[4] = r;
                uv[5] = b;
                uv[6] = l;
                uv[7] = b;
            } else if (sf._isFlipUVX) {
                /*
                3 - 2
                |   |
                1 - 0
                */
                uv[0] = r;
                uv[1] = b;
                uv[2] = l;
                uv[3] = b;
                uv[4] = r;
                uv[5] = t;
                uv[6] = l;
                uv[7] = t;
            } else if (sf._isFlipUVY) {
                /*
                0 - 1
                |   |
                2 - 3
                */
                uv[0] = l;
                uv[1] = t;
                uv[2] = r;
                uv[3] = t;
                uv[4] = l;
                uv[5] = b;
                uv[6] = r;
                uv[7] = b;
            } else {
                /*
                2 - 3
                |   |
                0 - 1
                */
                uv[0] = l;
                uv[1] = b;
                uv[2] = r;
                uv[3] = b;
                uv[4] = l;
                uv[5] = t;
                uv[6] = r;
                uv[7] = t;
            }

        }

    }
}
