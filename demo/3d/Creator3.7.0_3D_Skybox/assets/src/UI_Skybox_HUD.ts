import { _decorator, Component, Node, EventTouch, Button, director, loader, TextureCube, find } from 'cc';
import { UIController } from './UIController';
import { UILayer, UIMgr } from './UIMgr';

export class UI_SkyboxHUD extends UIController {

    constructor() {
        super('prefab/ui_skybox_hud_panel', UILayer.HUD);
    }

    private _oldSelected: Button = null;
    private _isLoadingCubemap = false;

    protected onCreated() {
        for (let i = 0; i < 10; ++i) {
            let index = i + 1;
            let sep = index < 10 ? '0' : '';
            let skyboxName = sep + index;
            let btnName = 'ScrollView/view/content/btn_0' + skyboxName;
            this.onButtonEvent(btnName, (btn: Button, skyboxName: string) => {
                if (this._isLoadingCubemap) {
                    return;
                }

                btn.interactable = false;
                if (this._oldSelected) {
                    this._oldSelected.interactable = true;
                }
                this._oldSelected = btn;

                this._isLoadingCubemap = true;
                loader.loadRes('cubemap/cubemap_sky' + skyboxName, TextureCube, (err, cubemap: TextureCube) => {
                    this._isLoadingCubemap = false;
                    director.getScene().globals.skybox.envmap = cubemap;
                });

            }, this, skyboxName);

            if(i == 0){
                this._oldSelected = (find(btnName,this.node) as Node).getComponent(Button);
                this._oldSelected.interactable = false;
            }
        }
    }
}