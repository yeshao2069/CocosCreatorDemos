import { _decorator, SpriteFrame, Component, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item {
    @property
    public id = 0;
    @property
    public itemName = '';
    @property
    public itemPrice = 0;
    @property(SpriteFrame)
    public iconSF = null;
}


@ccclass('ItemList')
export class ItemList extends Component {
    @property([Item])
    public items = [];
    @property(Prefab)
    public itemPrefab = null;

    onLoad () {
        for (var i = 0; i < this.items.length; ++i) { 
            var item = instantiate(this.itemPrefab); 
            var data = this.items[i]; 
            this.node.addChild(item); 
            item.getComponent('ItemTemplate').init({ 
                id: data.id, 
                itemName: data.itemName, 
                itemPrice: data.itemPrice, 
                iconSF: data.iconSF 
            }); 
        } 
    }

}