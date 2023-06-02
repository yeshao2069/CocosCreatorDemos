import { _decorator, Component, Sprite, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {
    @property
    public id = 0;
    @property(Sprite)
    public icon = null;
    @property(Label)
    public itemName = null;
    @property(Label)
    public itemPrice = null;

    init (data: any) {
        this.id = data.id; 
        this.icon.spriteFrame = data.iconSF; 
        this.itemName.string = data.itemName; 
        this.itemPrice.string = data.itemPrice; 
    }
}
