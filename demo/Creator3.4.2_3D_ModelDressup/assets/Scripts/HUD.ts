import { UIController } from "./UIController";
import { UILayer } from "./UIMgr";
import { AvatarBodyparts } from "./AvatarBodyparts";
import { game } from "cc";

export class HUD extends UIController {

    constructor() {
        super('ui/HUD', UILayer.HUD);
    }

    protected onCreated() {

        let fn = (_evt: any, args: { part: any; suit: any; }) => {
            game.emit(AvatarBodyparts.EVENT_CHANGE_PART, args.part, args.suit);
        }

        for (let i = 0; i < AvatarBodyparts.NUM; ++i) {
            let partName = AvatarBodyparts.getPartName(i);
            this.onButtonEvent('ops/' + partName + '/btn_004', fn, null, { part: i, suit: '004' });
            this.onButtonEvent('ops/' + partName + '/btn_006', fn, null, { part: i, suit: '006' });
            this.onButtonEvent('ops/' + partName + '/btn_008', fn, null, { part: i, suit: '008' });
        }

    }
}
