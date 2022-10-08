
import { _decorator, Component, Node, Label, RichText, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Priter')
export class Priter extends Component {
    @property(Label)
    label !: Label;

    @property(RichText)
    richText !: RichText;

    @property(EditBox)
    richTextEditBox !: EditBox;

    printerTimer : number = 0; // 计时器ID

    onLoad () {
        this.richTextEditBox.string = "FF0000";
        this.showRichTextPrinter();
    }

    beforeDestory () {
        // Destory前确保定时器关闭
        this.printerTimer && clearInterval(this.printerTimer);
    }

    showLabelPrinter () {
        let str = '大家好，我是木限东！\n这个是Label打字效果';
        this.richText.string = '';
        this.label.string = '';
        this.makeLabelPrinter(str);
    }

    makeLabelPrinter (str: string) {
        let charArr = str.split('');
        let charIdx = 0;

        this.printerTimer && clearInterval(this.printerTimer);
        this.printerTimer = setInterval(() => {
            if (charIdx >= charArr.length) {
                this.printerTimer && clearInterval(this.printerTimer);
            } else {
                charIdx += 1;
                this.label.string = charArr.slice(0, charIdx).join('');
            }
        }, 50);
    }
    
    showRichTextPrinter() {
        let richTextColor = this.richTextEditBox.string;
        let str = '大家好，我是<color=#' + richTextColor + '>木限东</c>！\n这是<color=#' + richTextColor + '>富文本打字机</color>效果';
        this.richText.string = '';
        this.label.string = '';
        this.makeRichTextPrinter(str);
    }
    
    makeRichTextPrinter(str: string) {
    let delimiterCharList: any = ['✁', '✂', '✃', '✄', '✺', '✻', '✼', '❄', '❅', '❆', '❇', '❈', '❉', '❊'];
    let regexp = /<.+?\/?>/g;
    let matchArr = str.match(regexp);
    let delimiterChar = delimiterCharList.find((item: string) => str.indexOf(item) == -1);
    let replaceStr = str.replace(regexp, delimiterChar);
    let tagInfoArr = [];
    let temp = [];
    let tagInfo: { endStr?: string | any[]; endtIdx?: number; startIdx?: number; startStr?: string | any[] } = {};
    let num = 0;
    for (let i = 0; i < replaceStr.length; i++) {
        if (replaceStr[i] == delimiterChar) {
        temp.push(i);
        if (temp.length >= 2) {
            tagInfo.endStr = matchArr![tagInfoArr.length * 2 + 1];
            tagInfo.endtIdx = i - num;
            tagInfoArr.push(tagInfo);
            temp = [];
            tagInfo = {};
        } else {
            tagInfo.startIdx = i - num;
            tagInfo.startStr = matchArr![tagInfoArr.length * 2];
        }
        num += 1;
        }
    }

    let showCharArr = str.replace(regexp, '').split('');
    let printerArray: string[] = [];
    for (let i = 1; i <= showCharArr.length; i++) {
        let temp = showCharArr.join('').slice(0, i);
        let addLen = 0;
        for (let j = 0; j < tagInfoArr.length; j++) {
        let tagInfo = tagInfoArr[j];
        let start = tagInfo.startIdx!;
        let end = tagInfo.endtIdx!;
        if (i > start && i <= end) {
            temp = temp.slice(0, start + addLen) + tagInfo.startStr + temp.slice(start + addLen) + tagInfo.endStr;
            addLen += tagInfo.startStr!.length + tagInfo.endStr!.length;
        } else if (i > end) {
            temp =
            temp.slice(0, start + addLen) +
            tagInfo.startStr +
            temp.slice(start + addLen, end + addLen) +
            tagInfo.endStr +
            temp.slice(end + addLen);
            addLen += tagInfo.startStr!.length + tagInfo.endStr!.length;
        }
        }
        printerArray.unshift(temp);
    }

    this.printerTimer && clearInterval(this.printerTimer);
    this.printerTimer = setInterval(() => {
        if (printerArray.length) {
        this.richText.string = printerArray.pop()!;
        } else {
        this.printerTimer && clearInterval(this.printerTimer);
        }
    }, 50);
    }
}
