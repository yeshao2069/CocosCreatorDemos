System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, StencilManager, Color, MTBatcher2D, _crd;

  _export("MTBatcher2D", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      StencilManager = _cc.StencilManager;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ead7eMdbOFK3oBOL8VIQMZ1", "MTBatcher2D", undefined);

      _export("MTBatcher2D", MTBatcher2D = class MTBatcher2D {
        constructor() {
          this.textures = [];
          this.samplers = [];
          this.textureHashs = [];
          this.samplerHashs = [];
          this.curIsMTSprite = false;
          this.texBindingMap = new Map();
        }

        getTexturesIdx(textHash) {
          for (let i = 0; i < this.textureHashs.length; i++) {
            if (this.textureHashs[i] === textHash) {
              return i;
            }
          }

          return -1;
        }

        addTexture(texture, textHash, maxTextureSize) {
          if (this.textures.length >= maxTextureSize) {
            return false;
          }

          this.textures.push(texture);
          this.textureHashs.push(textHash);
          return true;
        }

        canBatchTexture(texture, textHash, maxTextureSize) {
          if (this.getTexturesIdx(textHash) >= 0) {
            return true;
          }

          if (this.addTexture(texture, textHash, maxTextureSize)) {
            return true;
          }

          return false;
        }

        getSamplerIdx(samplerHash) {
          for (let i = 0; i < this.samplerHashs.length; i++) {
            if (this.samplerHashs[i] === samplerHash) {
              return i;
            }
          }

          return -1;
        }

        addSampler(sampler, samplerHash, maxTextureSize) {
          if (this.samplers.length >= maxTextureSize) {
            return false;
          }

          this.samplers.push(sampler);
          this.samplerHashs.push(samplerHash);
          return true;
        }

        canBatchSampler(sampler, samplerHash, maxTextureSize) {
          if (this.getSamplerIdx(samplerHash) >= 0) {
            return true;
          }

          if (this.addSampler(sampler, samplerHash, maxTextureSize)) {
            return true;
          }

          return false;
        }

        reset() {
          this.textures.length = 0;
          this.textureHashs.length = 0;
          this.samplers.length = 0;
          this.samplerHashs.length = 0;
        }

        static getInstance() {
          return MTBatcher2D.gInstance;
        }

        setTexturesBindingMap(bm) {
          this.texBindingMap = bm;
        }

        hackBatch2d(batcher) {
          if (MTBatcher2D.isHacked) {
            return;
          }

          MTBatcher2D.isHacked = true;
          const mtBatcher = MTBatcher2D.getInstance();
          batcher.commitComp = MTBatcher2D.commitComp;
          batcher.mtBatcher = mtBatcher;
          const origin_getDescriptorSet = batcher._descriptorSetCache.getDescriptorSet;

          batcher._descriptorSetCache.getDescriptorSet = function (batch) {
            const ds = origin_getDescriptorSet.call(this, batch);

            if (batch.fromMTSprite) {
              const pass = batch.passes[0];

              for (let i = 1; i < mtBatcher.textures.length; i++) {
                const texName = "spriteTexture" + i;

                if (mtBatcher.texBindingMap.has(texName)) {
                  const binding = mtBatcher.texBindingMap.get(texName);

                  if (mtBatcher.textures[i]) {
                    pass.bindTexture(binding, mtBatcher.textures[i]);
                  }

                  if (mtBatcher.samplers[i]) {
                    pass.bindSampler(binding, mtBatcher.samplers[i]);
                  }
                }
              }
            }

            return ds;
          };

          const origin_autoMergeBatches = batcher.autoMergeBatches;

          batcher.autoMergeBatches = function (renderComp) {
            const originLength = this._batches.length;
            origin_autoMergeBatches.call(this, renderComp);
            const newLength = this._batches.length;

            if (newLength === originLength) {
              return;
            }

            const isMTSprite = renderComp._isMTSprite || false;
            this._batches.get(newLength - 1).fromMTSprite = isMTSprite;
          };
        }

        static commitComp(comp, frame, assembler, transform) {
          const renderComp = comp;
          let texture;
          let samp;
          let textureHash = 0;
          let samplerHash = 0;

          if (frame) {
            texture = frame.getGFXTexture();
            samp = frame.getGFXSampler();
            textureHash = frame.getHash();
            samplerHash = frame.getSamplerInfo();
          } else {
            texture = null;
            samp = null;
          }

          const renderScene = renderComp._getRenderScene();

          const mat = renderComp.getRenderMaterial(0);
          renderComp.stencilStage = StencilManager.sharedManager.stage;
          const blendTargetHash = renderComp.blendHash;
          const depthStencilStateStage = renderComp.stencilStage;
          const mtBatcher = this.mtBatcher;
          const isMTSprite = comp._isMTSprite || false;

          if (this._currScene !== renderScene || this._currLayer !== comp.node.layer || this._currMaterial !== mat || this._currBlendTargetHash !== blendTargetHash || this._currDepthStencilStateStage !== depthStencilStateStage || this._currTransform !== transform || mtBatcher.curIsMTSprite !== isMTSprite || !mtBatcher.canBatchTexture(texture, textureHash, isMTSprite ? MTBatcher2D.GL_MAX_Texture : 1) || !mtBatcher.canBatchSampler(samp, samplerHash, isMTSprite ? MTBatcher2D.GL_MAX_Texture : 1)) {
            this.autoMergeBatches(this._currComponent);
            mtBatcher.reset();
            mtBatcher.addTexture(texture, textureHash);
            mtBatcher.addSampler(samp, samplerHash);
            mtBatcher.curIsMTSprite = isMTSprite;
            this._currScene = renderScene;
            this._currComponent = renderComp;
            this._currTransform = transform;
            this._currMaterial = mat;
            this._currTexture = texture;
            this._currSampler = samp;
            this._currTextureHash = textureHash;
            this._currSamplerHash = samplerHash;
            this._currBlendTargetHash = blendTargetHash;
            this._currDepthStencilStateStage = depthStencilStateStage;
            this._currLayer = comp.node.layer;
          }

          if (isMTSprite) {
            const sp = comp;
            sp.color = new Color(mtBatcher.getTexturesIdx(textureHash));
          }

          if (assembler) {
            assembler.fillBuffers(renderComp, this);
          }
        }

      });

      MTBatcher2D.GL_MAX_Texture = 8;
      MTBatcher2D.isHacked = false;
      MTBatcher2D.gInstance = new MTBatcher2D();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9d4b6d29c5adc2ee33be7bc2482bcc65cdf2e5ca.js.map