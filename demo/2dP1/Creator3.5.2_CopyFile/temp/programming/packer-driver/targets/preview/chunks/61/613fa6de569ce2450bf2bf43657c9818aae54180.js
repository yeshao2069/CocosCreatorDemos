System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, find, Label, sys, NATIVE, _dec, _class, _crd, ccclass, property, main;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      find = _cc.find;
      Label = _cc.Label;
      sys = _cc.sys;
    }, function (_ccEnv) {
      NATIVE = _ccEnv.NATIVE;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "03417ovHXJDiI2o7eMGnN4Y", "main", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("main", main = (_dec = ccclass('main'), _dec(_class = class main extends Component {
        // web 上复制
        copyFromWeb(str) {
          var input = str + '';
          var el = document.createElement('textarea');
          el.value = input;
          el.setAttribute('readonly', '');
          el.style.contain = 'strict';
          el.style.position = 'absolute';
          el.style.left = '-9999px';
          el.style.fontSize = '12pt'; // Prevent zooming on iOS

          var selection = getSelection();
          var originalRange = false;

          if (selection.rangeCount > 0) {
            // @ts-ignore
            originalRange = selection.getRangeAt(0);
          }

          document.body.appendChild(el);
          el.select();
          el.selectionStart = 0;
          el.selectionEnd = input.length;
          var success = false;

          try {
            success = document.execCommand('copy');
          } catch (err) {
            console.log('err:', err);
          }

          document.body.removeChild(el);

          if (originalRange) {
            selection.removeAllRanges(); // @ts-ignore

            selection.addRange(originalRange);
          }

          return success;
        } // 备用：解决 iOS web 剪切板问题


        copyFromiOSWeb(str) {
          var textString = str + '';
          var input = document.querySelector('#copy-input');

          if (!input) {
            input = document.createElement('input');
            input.id = "copy-input"; // 防止ios聚焦触发键盘事件 
            // @ts-ignore

            input.readOnly = true; // @ts-ignore

            input.style.position = "absolute"; // @ts-ignore

            input.style.left = "-1000px"; // @ts-ignore

            input.style.zIndex = "-1000";
            document.body.appendChild(input);
          } // ios必须先选中文字且不支持
          // @ts-ignore


          input.value = textString; // @ts-ignore

          input.select();
          selectText(input, 0, textString.length);
          console.log(document.execCommand('copy'), 'execCommand');

          if (document.execCommand('copy')) {
            document.execCommand('copy');
          } // input 自带的 select() 方法在苹果端无法进行选择，所以需要自己去写一个类似的方法 
          // @ts-ignore


          input.blur(); // 选择文本。createTextRange(setSelectionRange)是 input 方法 

          function selectText(textbox, startIndex, stopIndex) {
            if (textbox.createTextRange) {
              var range = textbox.createTextRange();
              range.collapse(true); // 起始光标

              range.moveStart('character', startIndex); // 结束光标

              range.moveEnd('character', stopIndex - startIndex);
              range.select();
            } else {
              textbox.setSelectionRange(startIndex, stopIndex);
              textbox.focus();
            }
          }
        }

        onClickCopy() {
          var str = find('Canvas/copyLabel').getComponent(Label).string;

          if (!NATIVE) {
            this.copyFromWeb(str);
          } else {
            if (sys.platform == sys.Platform.ANDROID) {
              jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "CopyToClipboard", "(Ljava/lang/String;)V", str);
            } else if (sys.platform == sys.Platform.IOS || sys.platform == sys.Platform.MACOS) {
              jsb.reflection.callStaticMethod("ViewController", "CopyToClipboard:", str);
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=613fa6de569ce2450bf2bf43657c9818aae54180.js.map