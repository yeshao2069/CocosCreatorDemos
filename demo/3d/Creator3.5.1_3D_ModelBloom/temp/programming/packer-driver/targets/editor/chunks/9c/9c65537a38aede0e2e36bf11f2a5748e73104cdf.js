System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Director, ForwardFlow, ForwardStage, gfx, Material, CCString, view, ShaderTexParams, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _class4, _class5, _descriptor3, _class6, _crd, ccclass, property, PPStageDesc, _samplerInfo, PPMgr;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPPBaseStage(extras) {
    _reporterNs.report("PPBaseStage", "./PPBaseStage", _context.meta, extras);
  }

  _export("ShaderTexParams", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Director = _cc.Director;
      ForwardFlow = _cc.ForwardFlow;
      ForwardStage = _cc.ForwardStage;
      gfx = _cc.gfx;
      Material = _cc.Material;
      CCString = _cc.CCString;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8a762uO149G2ok+tx9tfALL", "PPMgr", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ShaderTexParams", ShaderTexParams = class ShaderTexParams {
        constructor() {
          this.name = "";
        }

      });

      _export("PPStageDesc", PPStageDesc = (_dec = ccclass('PPStageDesc'), _dec2 = property(Material), _dec3 = property(CCString), _dec(_class = (_class2 = class PPStageDesc {
        constructor() {
          _initializerDefineProperty(this, "mat", _descriptor, this);

          _initializerDefineProperty(this, "stageName", _descriptor2, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stageName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "";
        }
      })), _class2)) || _class));

      _samplerInfo = [gfx.Filter.LINEAR, gfx.Filter.LINEAR, gfx.Filter.NONE, gfx.Address.CLAMP, gfx.Address.CLAMP, gfx.Address.CLAMP];

      _export("PPMgr", PPMgr = (_dec4 = ccclass('PPMgr'), _dec5 = property([PPStageDesc]), _dec4(_class4 = (_class5 = (_class6 = class PPMgr extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "stageDescs", _descriptor3, this);

          this.createPPStageMap = new Map();
          this.fbMap = new Map();
          this._quadIA = null;
        }

        get pipeline() {
          var _Director$instance$ro;

          const pl = (_Director$instance$ro = Director.instance.root) == null ? void 0 : _Director$instance$ro.pipeline;

          if (!pl) {
            return null;
          }

          return pl;
        }

        get device() {
          const pl = this.pipeline;

          if (!pl) {
            return null;
          }

          return pl == null ? void 0 : pl.device;
        }

        get samper() {
          const dev = this.device;

          if (!dev) {
            return null;
          } // @ts-ignore


          return this.device.getSampler(_samplerInfo);
        }

        get flows() {
          var _this$pipeline;

          const flows = (_this$pipeline = this.pipeline) == null ? void 0 : _this$pipeline.flows;

          if (!flows) {
            return null;
          }

          return flows;
        }

        init() {
          const pl = this.pipeline;

          if (!pl) {
            return;
          }

          this.generateIA(pl.device);
          this.replaceScreenFrameBuffer();
          this.stageDescs.forEach(stageDesc => {
            this.createPPStageMap.forEach(create => {
              const stage = create(stageDesc);

              if (!stage) {
                return;
              }

              this.addStage(stage);
            });
          });
        }

        registerCreateStage(cb) {
          PPMgr.createPPStageCounter++;
          this.createPPStageMap.set(PPMgr.createPPStageCounter, cb);
          return PPMgr.createPPStageCounter;
        }

        createFrameBufferIf(fbName) {
          let fb = this.fbMap.get(fbName);

          if (fb) {
            return fb;
          }

          const pl = this.pipeline;

          if (!pl) {
            return null;
          }

          const newfb = this.generateFrameBuffer(pl);

          if (newfb) {
            this.fbMap.set(fbName, newfb);
          }

          return newfb;
        }

        getFrameBuffer(name) {
          const fb = this.fbMap.get(name);

          if (!fb) {
            return null;
          }

          return fb;
        }

        replaceScreenFrameBuffer() {
          const flows = this.flows;

          if (!flows) {
            return;
          }

          const self = this;
          const screenTexName = "screenTex";
          const fb = this.createFrameBufferIf(screenTexName);

          if (!fb) {
            return;
          }

          for (let flow of flows) {
            if (flow instanceof ForwardFlow) {
              const ff = flow;

              for (let stage of ff.stages) {
                if (stage instanceof ForwardStage) {
                  const fstage = stage;
                  const originRender = fstage.render;

                  fstage.render = function (camera) {
                    var _camera$window;

                    const originfb = (_camera$window = camera.window) == null ? void 0 : _camera$window.framebuffer;

                    if (camera.window) {
                      // @ts-ignore
                      camera.window._framebuffer = self.fbMap.get(screenTexName);
                    }

                    originRender.call(fstage, camera); // @ts-ignore

                    camera.window._framebuffer = originfb;
                  };

                  break;
                }
              }

              break;
            }
          }
        }

        addStage(stage) {
          const pl = this.pipeline;

          if (!pl) {
            return;
          }

          const flows = this.flows;

          if (!flows) {
            return;
          }

          for (let flow of flows) {
            if (flow instanceof ForwardFlow) {
              stage.initWithStageDesc(this, pl);
              stage.ia = this._quadIA;
              stage.activate(pl, flow);
              flow.stages.push(stage);
              break;
            }
          }
        }

        generateIA(device) {
          if (null != this._quadIA) {
            return;
          }

          const vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          const vbSize = vbStride * 4;
          const quadVB = device.createBuffer(new gfx.BufferInfo(gfx.BufferUsageBit.VERTEX | gfx.BufferUsageBit.TRANSFER_DST, gfx.MemoryUsageBit.HOST | gfx.MemoryUsageBit.DEVICE, vbSize, vbStride));
          const vbData = new Float32Array(4 * 4);
          let n = 0;
          vbData[n++] = -1.0;
          vbData[n++] = -1.0;
          vbData[n++] = 0;
          vbData[n++] = 0;
          vbData[n++] = 1.0;
          vbData[n++] = -1.0;
          vbData[n++] = 1;
          vbData[n++] = 0;
          vbData[n++] = -1.0;
          vbData[n++] = 1.0;
          vbData[n++] = 0;
          vbData[n++] = 1;
          vbData[n++] = 1.0;
          vbData[n++] = 1.0;
          vbData[n++] = 1;
          vbData[n++] = 1;
          quadVB.update(vbData);
          const ibStride = Uint8Array.BYTES_PER_ELEMENT;
          const ibSize = ibStride * 6;
          const quadIB = device.createBuffer(new gfx.BufferInfo(gfx.BufferUsageBit.INDEX | gfx.BufferUsageBit.TRANSFER_DST, gfx.MemoryUsageBit.HOST | gfx.MemoryUsageBit.DEVICE, ibSize, ibStride));
          const indices = new Uint8Array(6);
          indices[0] = 0;
          indices[1] = 1;
          indices[2] = 2;
          indices[3] = 1;
          indices[4] = 3;
          indices[5] = 2;
          quadIB.update(indices);
          const attributes = new Array(2);
          attributes[0] = new gfx.Attribute('a_position', gfx.Format.RG32F);
          attributes[1] = new gfx.Attribute('a_texCoord', gfx.Format.RG32F);
          const quadIA = device.createInputAssembler(new gfx.InputAssemblerInfo(attributes, [quadVB], quadIB));
          this._quadIA = quadIA;
        }

        generateFrameBuffer(pl) {
          const device = pl.device;

          if (null == device) {
            return null;
          }

          const width = view.getViewportRect().width;
          const height = view.getViewportRect().height;
          console.log(gfx);
          const colorAttachment0 = new gfx.ColorAttachment();
          colorAttachment0.format = gfx.Format.RGBA16F;
          colorAttachment0.loadOp = gfx.LoadOp.CLEAR;
          colorAttachment0.storeOp = gfx.StoreOp.STORE;
          const depthStencilAttachment = new gfx.DepthStencilAttachment();
          depthStencilAttachment.format = gfx.Format.BC1_ALPHA;
          depthStencilAttachment.depthLoadOp = gfx.LoadOp.CLEAR;
          depthStencilAttachment.depthStoreOp = gfx.StoreOp.STORE;
          depthStencilAttachment.stencilLoadOp = gfx.LoadOp.CLEAR;
          depthStencilAttachment.stencilStoreOp = gfx.StoreOp.STORE;
          const rPass = device.createRenderPass(new gfx.RenderPassInfo([colorAttachment0], depthStencilAttachment));
          const clrTexs = [];
          clrTexs.push(device.createTexture(new gfx.TextureInfo(gfx.TextureType.TEX2D, gfx.TextureUsageBit.COLOR_ATTACHMENT | gfx.TextureUsageBit.SAMPLED, gfx.Format.RGBA16F, width, height)));
          const depthTex = device.createTexture(new gfx.TextureInfo(gfx.TextureType.TEX2D, gfx.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, gfx.Format.BC1_ALPHA, width, height));
          const fb = device.createFramebuffer(new gfx.FramebufferInfo(rPass, clrTexs, depthTex));
          return fb;
        }

        destroyQuadInputAssembler() {
          if (this._quadIA) {
            var _this$_quadIA, _this$_quadIA$indexBu;

            let vbs = (_this$_quadIA = this._quadIA) == null ? void 0 : _this$_quadIA.vertexBuffers;
            vbs.forEach(vb => {
              vb.destroy();
            });
            (_this$_quadIA$indexBu = this._quadIA.indexBuffer) == null ? void 0 : _this$_quadIA$indexBu.destroy();

            this._quadIA.destroy();

            this._quadIA = null;
          }
        }

      }, _class6.createPPStageCounter = 0, _class6), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "stageDescs", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9c65537a38aede0e2e36bf11f2a5748e73104cdf.js.map