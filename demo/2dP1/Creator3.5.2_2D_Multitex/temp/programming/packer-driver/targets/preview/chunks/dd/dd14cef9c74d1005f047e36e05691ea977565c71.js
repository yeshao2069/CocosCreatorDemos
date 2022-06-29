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
          for (var i = 0; i < this.textureHashs.length; i++) {
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
          for (var i = 0; i < this.samplerHashs.length; i++) {
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
          var mtBatcher = MTBatcher2D.getInstance();
          batcher.commitComp = MTBatcher2D.commitComp;
          batcher.mtBatcher = mtBatcher;
          var origin_getDescriptorSet = batcher._descriptorSetCache.getDescriptorSet;

          batcher._descriptorSetCache.getDescriptorSet = function (batch) {
            var ds = origin_getDescriptorSet.call(this, batch);

            if (batch.fromMTSprite) {
              var pass = batch.passes[0];

              for (var i = 1; i < mtBatcher.textures.length; i++) {
                var texName = "spriteTexture" + i;

                if (mtBatcher.texBindingMap.has(texName)) {
                  var binding = mtBatcher.texBindingMap.get(texName);

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

          var origin_autoMergeBatches = batcher.autoMergeBatches;

          batcher.autoMergeBatches = function (renderComp) {
            var originLength = this._batches.length;
            origin_autoMergeBatches.call(this, renderComp);
            var newLength = this._batches.length;

            if (newLength === originLength) {
              return;
            }

            var isMTSprite = renderComp._isMTSprite || false;
            this._batches.get(newLength - 1).fromMTSprite = isMTSprite;
          };
        }

        static commitComp(comp, renderData, frame, assembler, transform) {
          var mtBatcher = this.mtBatcher;
          var isMTSprite = comp._isMTSprite || false;
          var dataHash = 0;
          var mat;
          var bufferID = -1;

          if (renderData && renderData.chunk) {
            if (!renderData.isValid()) return;
            dataHash = renderData.dataHash;
            mat = renderData.material;
            bufferID = renderData.chunk.bufferId;
          }

          comp.stencilStage = StencilManager.sharedManager.stage;
          var depthStencilStateStage = comp.stencilStage; // @ts-ignore

          if (this._currHash !== dataHash || dataHash === 0 || this._currMaterial !== mat || this.currDepthStencilStateStage !== depthStencilStateStage || mtBatcher.curIsMTSprite !== isMTSprite || !mtBatcher.canBatchTexture(texture, textureHash, isMTSprite ? MTBatcher2D.GL_MAX_Texture : 1) || !mtBatcher.canBatchSampler(samp, samplerHash, isMTSprite ? MTBatcher2D.GL_MAX_Texture : 1)) {
            this.autoMergeBatches(this._currComponent);
            mtBatcher.reset();
            mtBatcher.addTexture(texture, textureHash);
            mtBatcher.addSampler(samp, samplerHash);
            mtBatcher.curIsMTSprite = isMTSprite;

            if (renderData && !renderData.isMeshBuffer) {
              this.updateBuffer(renderData.vertexFormat, bufferID);
            }

            this._currRenderData = renderData;
            this._currHash = renderData ? renderData.dataHash : 0;
            this._currComponent = comp;
            this._currTransform = transform;
            this._currMaterial = comp.getRenderMaterial(0);
            this._currDepthStencilStateStage = depthStencilStateStage;
            this._currLayer = comp.node.layer;

            if (frame) {
              this._currTexture = frame.getGFXTexture();
              this._currSampler = frame.getGFXSampler();
              this._currTextureHash = frame.getHash();
              this._currSamplerHash = this._currSampler.hash;
            } else {
              this._currTexture = null;
              this._currSampler = null;
              this._currTextureHash = 0;
              this._currSamplerHash = 0;
            }
          }

          if (isMTSprite) {
            var sp = comp;
            sp.color = new Color(mtBatcher.getTexturesIdx(this._currTextureHash));
          }

          if (assembler) {
            assembler.fillBuffers(comp, this);
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
//# sourceMappingURL=dd14cef9c74d1005f047e36e05691ea977565c71.js.map