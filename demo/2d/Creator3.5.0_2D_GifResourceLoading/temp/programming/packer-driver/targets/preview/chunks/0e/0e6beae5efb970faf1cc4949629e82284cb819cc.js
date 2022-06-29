System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, SpriteFrame, Texture2D, assetManager, loader, log, ImageAsset, JSB, LZW, GIF, GIFCache, FileHead, _crd, FileType;

  function _reportPossibleCrUseOfLZW(extras) {
    _reporterNs.report("LZW", "./LZW", _context.meta, extras);
  }

  _export({
    FileHead: void 0,
    FileType: void 0
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      assetManager = _cc.assetManager;
      loader = _cc.loader;
      log = _cc.log;
      ImageAsset = _cc.ImageAsset;
    }, function (_ccEnv) {
      JSB = _ccEnv.JSB;
    }, function (_unresolved_2) {
      LZW = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c63d8V3c2NPzYNB3sN3b21c", "GIF", undefined);

      (function (FileType) {
        FileType[FileType["UNKNOWN"] = 0] = "UNKNOWN";
        FileType[FileType["PNG"] = 1] = "PNG";
        FileType[FileType["JPG"] = 2] = "JPG";
        FileType[FileType["GIF"] = 3] = "GIF";
        FileType[FileType["WEBP"] = 4] = "WEBP";
      })(FileType || _export("FileType", FileType = {}));

      _export("GIF", GIF = class GIF {
        constructor() {
          this._tab = void 0;
          this._view = void 0;
          this._frame = void 0;
          this._buffer = void 0;
          this._offset = 0;
          this._lastData = void 0;
          this._info = {
            header: '',
            frames: [],
            comment: ''
          };
          this._delays = [];
          this._spriteFrames = [];
          this._canvas = null;
          this._context = null;
          this.id = "GIF";
          this.async = true;
        }

        set buffer(buffer) {
          this.clear();
          this._buffer = buffer;
          this._view = new Uint8Array(buffer);
        }

        get buffer() {
          return this._buffer;
        }

        handle(item, callback) {
          this.buffer = item;
          this.getHeader();
          this.getScrDesc();
          this.getTexture();

          if (this._spriteFrames.length == 0) {
            callback(new Error("gif加载失败,帧长度为0"));
          } else {
            callback(null, {
              delays: this._delays,
              spriteFrames: this._spriteFrames,
              length: this._info.frames.length
            });
          }
        }

        static detectFormat(data) {
          if (data.indexOf(FileHead.IMAGE_GIF) != -1) {
            return FileType.GIF;
          } else if (data.indexOf(FileHead.IMAGE_PNG) != -1) {
            return FileType.PNG;
          } else if (data.indexOf(FileHead.IMAGE_JPG) != -1) {
            return FileType.JPG;
          } else if (data.indexOf(FileHead.WEBP_RIFF) != -1 && data.indexOf(FileHead.WEBP_WEBP) != -1) {
            return FileType.WEBP;
          } else {
            return FileType.UNKNOWN;
          }
        }

        static bytes2HexString(arrBytes) {
          var str = "";

          for (var i = 0; i < arrBytes.length; i++) {
            var tmp;
            var num = arrBytes[i];

            if (num < 0) {
              tmp = (255 + num + 1).toString(16);
            } else {
              tmp = num.toString(16);
            }

            if (tmp.length == 1) {
              tmp = "0" + tmp;
            }

            str += tmp;
          }

          return str;
        }

        getTexture() {
          var index = 0; // console.log(this._info.frames,'info')

          for (var frame of this._info.frames) {
            this.decodeFrame2Texture(frame, index++);
          }
        }

        getSpriteFrame(index) {
          if (this._spriteFrames[index]) return this._spriteFrames[index];
          return this.decodeFrame2Texture(this._info.frames[index], index);
        }

        decodeFrame(frame) {
          var imageData; // console.log(frame,'frame')

          if (JSB) {
            imageData = this._context.createImageData(frame.img.w, frame.img.h);
          } else {
            imageData = this._context.getImageData(frame.img.x, frame.img.y, frame.img.w, frame.img.h);
          }

          frame.img.m ? this._tab = frame.img.colorTab : this._tab = this._info.colorTab;
          (_crd && LZW === void 0 ? (_reportPossibleCrUseOfLZW({
            error: Error()
          }), LZW) : LZW).decode(frame.img.srcBuf, frame.img.codeSize).forEach((j, k) => {
            imageData.data[k * 4] = this._tab[j * 3];
            imageData.data[k * 4 + 1] = this._tab[j * 3 + 1];
            imageData.data[k * 4 + 2] = this._tab[j * 3 + 2];
            imageData.data[k * 4 + 3] = 255;
            frame.ctrl.t ? j == frame.ctrl.tranIndex ? imageData.data[k * 4 + 3] = 0 : 0 : 0;
          });
          return imageData;
        }

        mergeFrames(lastImageData, curImageData) {
          var imageData = curImageData;

          if (lastImageData) {
            for (var i = 0; i < imageData.data.length; i += 4) {
              if (imageData.data[i + 3] == 0) {
                imageData.data[i] = this._lastData.data[i];
                imageData.data[i + 1] = this._lastData.data[i + 1];
                imageData.data[i + 2] = this._lastData.data[i + 2];
                imageData.data[i + 3] = this._lastData.data[i + 3];
              }
            }
          }

          return imageData;
        }

        dataUrl2SpriteFrame(dataUrl) {
          var texture = new Texture2D();
          var spriteFrame = new SpriteFrame();
          var image = new Image();
          image.src = dataUrl;
          image.width = this._canvas.width;
          image.height = this._canvas.height;
          var img = new ImageAsset(image);
          img.onLoaded();
          texture.image = img;
          spriteFrame.texture = texture;
          return spriteFrame;
        }

        date2SpriteFrame(data, width, height) {
          var texture = new Texture2D();
          var spriteFrame = new SpriteFrame(); // spriteFrame = find('Canvas/test').getComponent(Sprite).spriteFrame

          var image = new Image();
          image.width = width;
          image.height = height;
          image._data = data._data; // console.log(data._data,'  ==imagedata==  ',htm)

          var imageAsset = new ImageAsset(image); // image.reset({
          //     _data: data._data,
          //     _compressed: false,
          //     width: width, 
          //     height: height,
          //     format: Texture2D.PixelFormat.RGBA8888
          // });

          texture.image = imageAsset; // console.log(image,'  ==image==  ',texture)
          // texture._nativeAsset = data;

          spriteFrame.texture = texture; // spriteFrame.texture = texture;

          return spriteFrame;
        }

        putImageDataJSB(imageData, x, y, frame) {
          var cheeckNullPixel = () => {
            if (imageData.data[0] == 4 && imageData.data[1] == 0 && imageData.data[2] == 0 && imageData.data[3] == 0) {
              return true;
            }

            return false;
          };

          var checkAlpha = () => {
            var alphaCount = 0;

            for (var i = 0; i < imageData.height; i += 2) {
              var lineCount = 0;

              for (var j = 0; j < imageData.width; j++) {
                var indexData = i * 4 * imageData.width + 4 * j;

                if (imageData.data[indexData + 3] == 0) {
                  lineCount++;
                }
              }

              if (lineCount / imageData.width > 0.1) {
                alphaCount++;
              }

              if (alphaCount / (imageData.height / 2) > 0.6) return true;
            }

            return false;
          };

          var replay = () => {
            for (var i = 0; i < imageData.height; i++) {
              for (var j = 0; j < imageData.width; j++) {
                var indexData = i * 4 * imageData.width + 4 * j;
                var indexLastData = (i + y) * 4 * this._lastData.width + 4 * (j + x);

                if (imageData.data[indexData + 3] != 0) {
                  this._lastData.data[indexLastData] = imageData.data[indexData];
                  this._lastData.data[indexLastData + 1] = imageData.data[indexData + 1];
                  this._lastData.data[indexLastData + 2] = imageData.data[indexData + 2];
                  this._lastData.data[indexLastData + 3] = imageData.data[indexData + 3];
                }
              }
            }
          };

          var clearAndReplay = () => {
            for (var i = 0; i < this._lastData.height; i++) {
              for (var j = 0; j < this._lastData.width; j++) {
                var indexLastData = i * 4 * this._lastData.width + 4 * j;
                var indexData = (i - y) * 4 * imageData.width + 4 * (j - x);
                var clear = false;

                if (j < x || j > x + imageData.width) {
                  clear = true;
                }

                if (i < y || i > y + imageData.height) {
                  clear = true;
                }

                if (clear) {
                  this._lastData.data[indexLastData + 0] = 0;
                  this._lastData.data[indexLastData + 1] = 0;
                  this._lastData.data[indexLastData + 2] = 0;
                  this._lastData.data[indexLastData + 3] = 0;
                } else {
                  this._lastData.data[indexLastData + 0] = imageData.data[indexData + 0];
                  this._lastData.data[indexLastData + 1] = imageData.data[indexData + 1];
                  this._lastData.data[indexLastData + 2] = imageData.data[indexData + 2];
                  this._lastData.data[indexLastData + 3] = imageData.data[indexData + 3];
                }
              }
            }
          };

          if (cheeckNullPixel()) {
            return;
          }

          if (frame.ctrl.disp == 1 || frame.ctrl.disp == 0) {
            replay();
          } else if (frame.ctrl.disp == 2) {
            clearAndReplay();
          } else {
            if (checkAlpha()) {
              clearAndReplay();
            } else {
              replay();
            }
          }
        }

        putImageDataWeb(imageData, frame) {
          var finalImageData;

          if (frame.ctrl.disp == 1 || frame.ctrl.disp == 0) {
            this._context.putImageData(imageData, frame.img.x, frame.img.y, 0, 0, frame.img.w, frame.img.h);

            var curImageData = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);

            var lastImageData = this._lastData;
            finalImageData = this.mergeFrames(lastImageData, curImageData);
          } else {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this._context.putImageData(imageData, frame.img.x, frame.img.y, 0, 0, frame.img.w, frame.img.h);

            finalImageData = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
          }

          this._context.putImageData(finalImageData, 0, 0);

          this._lastData = finalImageData;
          return this._canvas.toDataURL();
        }

        decodeFrame2Texture(frame, index) {
          if (!this._context) {
            this._canvas = document.createElement('canvas');
            this._context = this._canvas.getContext('2d');
            this._canvas.width = frame.img.w;
            this._canvas.height = frame.img.h;
          } // console.log('decodeFrame2Texture')


          var imageData = this.decodeFrame(frame);
          this._delays[index] = frame.ctrl.delay;

          if (JSB) {
            if (!this._lastData) {
              this._lastData = imageData;
            } else {
              this.putImageDataJSB(imageData, frame.img.x, frame.img.y, frame);
            }

            this._spriteFrames[index] = this.date2SpriteFrame(this._lastData, this._canvas.width, this._canvas.height);
          } else {
            var dataUrl = this.putImageDataWeb(imageData, frame);
            this._spriteFrames[index] = this.dataUrl2SpriteFrame(dataUrl);
          }

          return this._spriteFrames[index];
        }

        read(len) {
          return this._view.slice(this._offset, this._offset += len);
        }

        getHeader() {
          this._info.header = '';
          this.read(6).forEach((e, i, arr) => {
            this._info.header += String.fromCharCode(e);
          });
        }

        getScrDesc() {
          var arr = this.read(7),
              i;
          this._info.w = arr[0] + (arr[1] << 8);
          this._info.h = arr[2] + (arr[3] << 8);
          this._info.m = 1 & arr[4] >> 7;
          this._info.cr = 7 & arr[4] >> 4;
          this._info.s = 1 & arr[4] >> 3;
          this._info.pixel = arr[4] & 0x07;
          this._info.bgColor = arr[5];
          this._info.radio = arr[6];

          if (this._info.m) {
            this._info.colorTab = this.read((2 << this._info.pixel) * 3);
          }

          this.decode();
        }

        decode() {
          var srcBuf = [];
          var arr = this.read(1);

          switch (arr[0]) {
            case 33:
              //扩展块
              this.extension();
              break;

            case 44:
              //图象标识符
              arr = this.read(9);
              this._frame.img = {
                x: arr[0] + (arr[1] << 8),
                y: arr[2] + (arr[3] << 8),
                w: arr[4] + (arr[5] << 8),
                h: arr[6] + (arr[7] << 8),
                colorTab: 0
              };
              this._frame.img.m = 1 & arr[8] >> 7;
              this._frame.img.i = 1 & arr[8] >> 6;
              this._frame.img.s = 1 & arr[8] >> 5;
              this._frame.img.r = 3 & arr[8] >> 3;
              this._frame.img.pixel = arr[8] & 0x07;

              if (this._frame.img.m) {
                this._frame.img.colorTab = this.read((2 << this._frame.img.pixel) * 3);
              }

              this._frame.img.codeSize = this.read(1)[0];
              srcBuf = [];

              while (1) {
                arr = this.read(1);

                if (arr[0]) {
                  this.read(arr[0]).forEach((e, i, arr) => {
                    srcBuf.push(e);
                  });
                } else {
                  this._frame.img.srcBuf = srcBuf;
                  this.decode();
                  break;
                }
              }

              ;
              break;

            case 59:
              break;

            default:
              break;
          }
        }

        extension() {
          var arr = this.read(1),
              o,
              s;

          switch (arr[0]) {
            case 255:
              //应用程序扩展
              if (this.read(1)[0] == 11) {
                this._info.appVersion = '';
                this.read(11).forEach((e, i, arr) => {
                  this._info.appVersion += String.fromCharCode(e);
                });

                while (1) {
                  arr = this.read(1);

                  if (arr[0]) {
                    this.read(arr[0]);
                  } else {
                    this.decode();
                    break;
                  }
                }

                ;
              } else {
                throw new Error('解析出错');
              }

              break;

            case 249:
              //图形控制扩展
              if (this.read(1)[0] == 4) {
                arr = this.read(4);
                this._frame = {};
                this._frame.ctrl = {
                  disp: 7 & arr[0] >> 2,
                  i: 1 & arr[0] >> 1,
                  t: arr[0] & 0x01,
                  delay: arr[1] + (arr[2] << 8),
                  tranIndex: arr[3]
                };

                this._info.frames.push(this._frame);

                if (this.read(1)[0] == 0) {
                  this.decode();
                } else {
                  throw new Error('解析出错');
                }
              } else {
                throw new Error('解析出错');
              }

              break;

            case 254:
              //注释块
              arr = this.read(1);

              if (arr[0]) {
                this.read(arr[0]).forEach((e, i, arr) => {
                  this._info.comment += String.fromCharCode(e);
                });

                if (this.read(1)[0] == 0) {
                  this.decode();
                }

                ;
              }

              break;

            default:
              break;
          }
        }

        clear() {
          this._tab = null;
          this._view = null;
          this._frame = null;
          this._offset = 0;
          this._info = {
            header: '',
            frames: [],
            comment: ''
          };
          this._lastData = null;
          this._delays = [];
          this._spriteFrames = [];
          this._canvas = null;
          this._context = null;
        }

      });

      _export("GIFCache", GIFCache = class GIFCache {
        constructor() {
          this.gifFrameMap = {};
        }

        static getInstance() {
          if (!GIFCache.instance) {
            GIFCache.instance = new GIFCache();

            if (JSB) {
              assetManager.downloader.register('.gif', assetManager.downloader._downloaders['.binary']);
            } else {
              assetManager.downloader.register('.gif', (url, options, onComplete) => {
                // console.log("downloader", url);
                assetManager.downloader._downloaders[".bin"](url, options, (err, data) => {
                  if (!err) {
                    // CC_JSB
                    if (typeof data === "string") {
                      assetManager.parser.parse(url, data, ".bin", options, onComplete);
                      return;
                    }
                  }

                  onComplete(err, data);
                });
              });
            }

            if (JSB) {
              assetManager.parser.register('.gif', (file, options, onComplete) => {
                var gif = new GIF();
                console.log('>>> jsb-file:', file);
                var buffer = jsb.fileUtils.getDataFromFile(file); // console.log(buffer,' >>> buffer')

                gif.handle(buffer, onComplete);
              });
            } else {
              assetManager.parser.register('.gif', (file, options, onComplete) => {
                var gif = new GIF();
                console.log('>>> web-file:', file);
                var buffer = file;

                if (file.arrayBuffer) {
                  buffer = file.arrayBuffer();
                }

                gif.handle(buffer, onComplete);
              });
            }
          }

          return GIFCache.instance;
        }

        preloadGif(data) {
          try {
            if (data.words) {
              data.words.forEach(item => {
                if (item.indexOf(".gif") != -1) loader.load(item.img, (error, data) => {});
              });
            }

            if (data.classes) {
              data.classes.forEach(item => {
                if (item.indexOf(".gif") != -1) loader.load(item.img, (error, data) => {});
              });
            }
          } catch (e) {
            log(e);
          }
        }

        addItemFrame(key, frameData) {
          if (this.has(key) == true) {
            var item = this.get(key);
            item.referenceCount++;
            item.frameData = frameData;
          } else {
            var gifCaheItem = {
              referenceCount: 0,
              type: FileType.GIF,
              frame: {}
            };
            this.gifFrameMap[key] = gifCaheItem;
          }
        }

        addItemType(key, type) {
          if (this.has(key)) {
            var item = this.get(key);
            item.type = type;
          } else {
            var gifCaheItem = {
              referenceCount: 0,
              type: type,
              frame: null
            };
            this.gifFrameMap[key] = gifCaheItem;
          }
        }

        add(key, value) {
          if (!this.has(key)) {
            this.gifFrameMap[key] = value;
          }
        }

        get(key) {
          return this.gifFrameMap[key];
        }

        has(key) {
          if (this.gifFrameMap[key] == undefined) {
            return false;
          }

          return true;
        }

        hasFrame(key) {
          var item = this.get(key);

          if (item != undefined) {
            var itemFrame = item.frameData;

            if (itemFrame != null) {
              return true;
            }
          }

          return false;
        }

        relase(key) {
          if (this.has(key)) {
            this.gifFrameMap[key] = undefined;
            loader.release(key);
          }
        }

        releaseAll() {
          for (var key in this.gifFrameMap) {
            loader.release(key);
          }

          this.gifFrameMap = {};
        }

      });

      GIFCache.instance = null;

      _export("FileHead", FileHead = class FileHead {});

      FileHead.IMAGE_PNG = "89504e47";
      FileHead.IMAGE_JPG = "ffd8ff";
      FileHead.IMAGE_GIF = "474946";
      FileHead.RIFF = "52494646";
      FileHead.WEBP_RIFF = FileHead.RIFF;
      FileHead.WEBP_WEBP = "57454250";

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0e6beae5efb970faf1cc4949629e82284cb819cc.js.map