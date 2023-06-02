import { _decorator, Component, SpriteFrame, Label, Sprite } from 'cc';
const { ccclass, property } = _decorator;

const getRandomInt = function (min, max) {
    let ratio = Math.random();
    return min + Math.floor((max - min) * ratio);
};
@ccclass('HeroSlot')
export class HeroSlot extends Component {
    @property([SpriteFrame])
    public sfAttributes = [];
    @property([SpriteFrame])
    public sfRanks = [];
    @property([SpriteFrame])
    public sfHeroes = [];
    @property([SpriteFrame])
    public sfBorders = [];
    @property(Label)
    public labelLevel = null;
    @property(Sprite)
    public spHero = null;
    @property(Sprite)
    public spRank = null;
    @property(Sprite)
    public spAttribute = null;
    @property(Sprite)
    public spBorder = null;
    @property([Sprite])
    public spStars = [];

    onLoad () {
        this.refresh(); 
    }

    refresh () {
        let bgIdx = getRandomInt(0, this.sfBorders.length); 
        let heroIdx = getRandomInt(0, this.sfHeroes.length); 
        let starIdx = getRandomInt(0, this.spStars.length); 
        let rankIdx = getRandomInt(0, this.sfRanks.length); 
        let attIdx = getRandomInt(0, this.sfAttributes.length); 
        let levelIdx = getRandomInt(0, 100); 
        this.labelLevel.string = 'LV.' + levelIdx; 
        this.spRank.spriteFrame = this.sfRanks[rankIdx]; 
        this.refreshStars(starIdx); 
        this.spBorder.spriteFrame = this.sfBorders[bgIdx]; 
        this.spAttribute.spriteFrame = this.sfAttributes[attIdx]; 
        this.spHero.spriteFrame = this.sfHeroes[heroIdx]; 
    }

    refreshStars (count: any) {
        for (let i = 0; i < this.spStars.length; ++i) { 
            if (i <= count) this.spStars[i].enabled = true; 
            else this.spStars[i].enabled = false; 
        } 
    }

}