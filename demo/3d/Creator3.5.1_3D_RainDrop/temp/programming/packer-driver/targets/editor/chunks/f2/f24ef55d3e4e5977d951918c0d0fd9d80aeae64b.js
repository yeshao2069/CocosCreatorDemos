System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, gfx, pipeline, Material, RenderStage, PipelineStateManager, Camera, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, colors, PPBaseStage;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPPMgr(extras) {
    _reporterNs.report("PPMgr", "./PPMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      gfx = _cc.gfx;
      pipeline = _cc.pipeline;
      Material = _cc.Material;
      RenderStage = _cc.RenderStage;
      PipelineStateManager = _cc.PipelineStateManager;
      Camera = _cc.Camera;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "17a84x5x8tMpZ/uPXmlJU4P", "PPBaseStage", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      colors = [new gfx.Color(0, 0, 0, 1)];

      _export("PPBaseStage", PPBaseStage = (_dec = ccclass('PPBaseStage'), _dec2 = property(Material), _dec(_class = (_class2 = class PPBaseStage extends RenderStage {
        constructor() {
          super();

          _initializerDefineProperty(this, "mat", _descriptor, this);

          this._ia = null;
          this._framebuffer = null;
          this.paramTexs = ['screenTex'];
          this.outputTexName = '';
          this._name = "PPBaseStage";
        }

        get ia() {
          return this._ia;
        }

        set ia(val) {
          this._ia = val;
        }

        get framebuffer() {
          return this._framebuffer;
        }

        set framebuffer(val) {
          this._framebuffer = val;
        }

        initWithStageDesc(mgr, pl) {
          this.bindShaderParamsTexs(mgr);
          this.setOutputFramebuffer(mgr);
        }

        bindShaderParamsVec2(name, value) {
          var _this$mat;

          const pass = (_this$mat = this.mat) == null ? void 0 : _this$mat.passes[0];

          if (!pass) {
            return;
          }

          const handle = pass.getHandle(name);

          if (handle < 1) {
            return;
          }

          pass.setUniform(handle, value);
        }

        bindShaderParamsTexs(mgr) {
          this.paramTexs.forEach(fbName => {
            this.bindShaderParamsTexture(mgr, fbName, fbName);
          });
        }

        setOutputFramebuffer(mgr) {
          if (!this.outputTexName) {
            return;
          }

          const fb = mgr.createFrameBufferIf(this.outputTexName);

          if (!fb) {
            return;
          }

          this.framebuffer = fb;
        }

        bindShaderParamsTexture(mgr, fbName, keyFBName) {
          var _this$mat2;

          const pass = (_this$mat2 = this.mat) == null ? void 0 : _this$mat2.passes[0];

          if (!pass) {
            return;
          }

          const binding = pass.getBinding(fbName);

          if (binding < 0) {
            return;
          }

          const fb = mgr.createFrameBufferIf(keyFBName);

          if (!fb) {
            return;
          }

          const samper = mgr.samper;

          if (!samper) {
            return;
          }

          pass.bindTexture(binding, fb.colorTextures[0]);
          pass.bindSampler(binding, samper);
        }

        activate(pipeline, flow) {
          var _this$mat3;

          super.activate(pipeline, flow);
          (_this$mat3 = this.mat) == null ? void 0 : _this$mat3.passes[0].update();
        }

        render(camera) {
          var _camera$window;

          if (camera.projectionType != Camera.ProjectionType.PERSPECTIVE) {
            return;
          }

          if (null == this.mat) {
            return;
          }

          if (null == this._ia) {
            return;
          }

          const pl = this._pipeline;
          const device = pl.device;
          const cmdBuff = pl.commandBuffers[0];
          let fb = this.framebuffer ? this.framebuffer : (_camera$window = camera.window) == null ? void 0 : _camera$window.framebuffer;

          if (null == fb) {
            return;
          }

          const rp = fb.renderPass;
          pl.pipelineUBO.updateCameraUBO(camera);
          const renderArea = new gfx.Rect(0, 0, 1, 1);
          const vp = camera.viewport;
          renderArea.x = vp.x * camera.width;
          renderArea.y = vp.y * camera.height;
          renderArea.width = vp.width * camera.width * pl.pipelineSceneData.shadingScale;
          renderArea.height = vp.height * camera.height * pl.pipelineSceneData.shadingScale;

          if (camera.clearFlag & gfx.ClearFlagBit.COLOR) {
            colors[0].x = camera.clearColor.x;
            colors[0].y = camera.clearColor.y;
            colors[0].z = camera.clearColor.z;
          }

          colors[0].w = camera.clearColor.w;
          cmdBuff.beginRenderPass(rp, fb, renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.bindDescriptorSet(pipeline.SetIndex.GLOBAL, pl.descriptorSet);
          const pass = this.mat.passes[0];
          const shader = this.mat.passes[0].getShaderVariant();
          let inputAssembler = this._ia;
          let pso = null;

          if (pass != null && shader != null && inputAssembler != null) {
            pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, rp, inputAssembler);
          }

          if (pso != null) {
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(pipeline.SetIndex.MATERIAL, pass.descriptorSet);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          }

          cmdBuff.endRenderPass();
        }

        destroy() {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f24ef55d3e4e5977d951918c0d0fd9d80aeae64b.js.map