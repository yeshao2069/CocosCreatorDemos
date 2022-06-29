System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, LZW, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5cab8dReeBFuaCLXz0Dd68F", "LZW", undefined);

      _export("default", LZW = class LZW {
        static decode(arr, min) {
          let clearCode = 1 << min,
              eofCode = clearCode + 1,
              size = min + 1,
              dict = [],
              pos = 0;

          function clear() {
            let i;
            dict = [];
            size = min + 1;

            for (i = 0; i < clearCode; i++) {
              dict[i] = [i];
            }

            dict[clearCode] = [];
            dict[eofCode] = null;
          }

          function decode() {
            let out = [],
                code,
                last;

            while (1) {
              last = code;
              code = read(size);

              if (code == clearCode) {
                clear();
                continue;
              }

              if (code == eofCode) {
                break;
              }

              if (code < dict.length) {
                if (last !== clearCode) {
                  dict.push(dict[last].concat(dict[code][0]));
                }
              } else {
                if (code !== dict.length) {
                  throw new Error('LZW解析出错');
                }

                dict.push(dict[last].concat(dict[last][0]));
              }

              out.push.apply(out, dict[code]);

              if (dict.length === 1 << size && size < 12) {
                size++;
              }
            }

            return out;
          }

          function read(size) {
            let i,
                code = 0;

            for (i = 0; i < size; i++) {
              if (arr[pos >> 3] & 1 << (pos & 7)) {
                code |= 1 << i;
              }

              pos++;
            }

            return code;
          }

          return decode();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b0d85dd3377c732883ae148f20adc1f0624265b6.js.map