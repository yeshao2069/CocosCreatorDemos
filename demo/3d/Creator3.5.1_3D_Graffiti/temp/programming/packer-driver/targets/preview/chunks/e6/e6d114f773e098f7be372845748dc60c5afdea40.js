System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Mat4, MeshRenderer, Vec3, gfx, Vec2, utils, DecalVertex, DecalMeshRenderer, _crd;

  _export("DecalMeshRenderer", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      Mat4 = _cc.Mat4;
      MeshRenderer = _cc.MeshRenderer;
      Vec3 = _cc.Vec3;
      gfx = _cc.gfx;
      Vec2 = _cc.Vec2;
      utils = _cc.utils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7eb5eTUuR1GVKf7+ylVNCbg", "DecalMeshRenderer", undefined);

      DecalVertex = class DecalVertex {
        constructor() {
          this.modelPos = void 0;
          this.viewPos = void 0;
          this.normal = void 0;
          this.uv = void 0;
          this.modelPos = new Vec3();
          this.viewPos = new Vec3();
          this.normal = new Vec3();
          this.uv = new Vec2();

          if (arguments.length >= 3) {
            this.uv.set(arguments.length <= 2 ? undefined : arguments[2]);
          }

          if (arguments.length >= 2) {
            this.normal.set(arguments.length <= 1 ? undefined : arguments[1]);
          }

          if (arguments.length >= 1) {
            this.viewPos.set(arguments.length <= 0 ? undefined : arguments[0]);
            this.modelPos.set(this.viewPos);
          }
        }

        applyMV(worldMat, viewMat) {
          Vec3.transformMat4(this.viewPos, this.modelPos, worldMat);
          this.viewPos.transformMat4(viewMat);
        }

        applyMVInv(worldInvMat, viewInvMat) {
          Vec3.transformMat4(this.modelPos, this.viewPos, viewInvMat);
          this.modelPos.transformMat4(worldInvMat);
        }

        clone() {
          var dv = new DecalVertex();
          dv.viewPos = this.viewPos.clone();
          dv.normal = this.normal.clone();
          dv.uv = this.uv.clone();
          return dv;
        }

      };

      _export("DecalMeshRenderer", DecalMeshRenderer = class DecalMeshRenderer extends MeshRenderer {
        constructor() {
          super(...arguments);
          this.matWorld = null;
          this.matView = new Mat4();
          this.matProj = new Mat4();
          this.matWorldInv = new Mat4();
          this.matViewInv = new Mat4();
          this.scale = new Vec3();
          this.decalVertexes = [];
          this.meshPositions = [];
          this.meshNormals = [];
          this.meshUVs = [];
        }

        genDecalMesh(target, me, eyePosition, center, normal, scale) {
          this.matWorld = target.worldMatrix;
          Mat4.invert(this.matWorldInv, this.matWorld);
          this.scale.set(scale);
          Mat4.lookAt(this.matView, eyePosition, center, Vec3.UNIT_X);
          Mat4.invert(this.matViewInv, this.matView);

          if (null == this.matWorld) {
            return;
          } // vertex info


          for (var i = 0; i < me.renderingSubMeshes.length; i++) {
            var pos = me.renderingSubMeshes[i].geometricInfo.positions;
            var idxs = me.renderingSubMeshes[i].geometricInfo.indices;
            var normals = me.readAttribute(i, gfx.AttributeName.ATTR_NORMAL);

            if (pos.length != (normals == null ? void 0 : normals.length)) {
              break;
            }

            if (idxs) {
              for (var idx = 0; idx < idxs.length; idx++) {
                var vPos = idxs[idx] * 3;
                var dv = new DecalVertex();
                dv.modelPos.set(pos[vPos], pos[vPos + 1], pos[vPos + 2]);
                dv.normal.set(normals[vPos], normals[vPos + 1], normals[vPos + 2]);
                dv.applyMV(this.matWorld, this.matView);
                this.decalVertexes.push(dv);
              }
            } else {
              for (var _vPos = 0; _vPos < pos.length; _vPos += 3) {
                var _dv = new DecalVertex();

                _dv.modelPos.set(pos[_vPos], pos[_vPos + 1], pos[_vPos + 2]);

                _dv.normal.set(normals[_vPos], normals[_vPos + 1], normals[_vPos + 2]);

                _dv.applyMV(this.matWorld, this.matView);

                this.decalVertexes.push(_dv);
              }
            }
          }

          this.decalVertexes = this.clipGeometrylByPlane(this.decalVertexes, new Vec3(1, 0, 0), this.scale.x / 2);
          this.decalVertexes = this.clipGeometrylByPlane(this.decalVertexes, new Vec3(-1, 0, 0), this.scale.x / 2);
          this.decalVertexes = this.clipGeometrylByPlane(this.decalVertexes, new Vec3(0, 1, 0), this.scale.y / 2);
          this.decalVertexes = this.clipGeometrylByPlane(this.decalVertexes, new Vec3(0, -1, 0), this.scale.y / 2);
          this.decalVertexes = this.clipGeometrylByPlane(this.decalVertexes, new Vec3(0, 0, 1), this.scale.z / 2);
          this.decalVertexes = this.clipGeometrylByPlane(this.decalVertexes, new Vec3(0, 0, -1), this.scale.z / 2);

          if (0 == this.decalVertexes.length) {
            console.log("decal vertexes length is 0");
            return;
          }

          for (var _i = 0; _i < this.decalVertexes.length; _i++) {
            var decalVertex = this.decalVertexes[_i];
            decalVertex.uv = new Vec2(0.5 + decalVertex.viewPos.x / this.scale.x, 0.5 + decalVertex.viewPos.y / this.scale.y);
            var modelPos = decalVertex.modelPos;
            modelPos.add(Vec3.multiplyScalar(new Vec3(), decalVertex.normal, 0.01));
            this.meshPositions.push(decalVertex.modelPos.x, decalVertex.modelPos.y, decalVertex.modelPos.z);
            this.meshNormals.push(decalVertex.normal.x, decalVertex.normal.y, decalVertex.normal.z);
            this.meshUVs.push(decalVertex.uv.x, decalVertex.uv.y);
          }

          var geo = {
            primitiveMode: gfx.PrimitiveMode.TRIANGLE_STRIP,
            positions: this.meshPositions,
            normals: this.meshNormals,
            uvs: this.meshUVs,
            attributes: [new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F), new gfx.Attribute(gfx.AttributeName.ATTR_NORMAL, gfx.Format.RGB32F), new gfx.Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F)]
          };
          this.mesh = utils.createMesh(geo, undefined, {
            calculateBounds: false
          });
        }

        clipLineByPlane(p0, p1, planeN, planeD) {
          var linePoints = [];
          var l0 = Vec3.subtract(new Vec3(), p1, p0);
          var l0d = Vec3.dot(planeN, l0);
          var p0d = Vec3.dot(planeN, p0);

          if (p0d < planeD && p0d + l0d < planeD) {
            // the line is fully inside of plane
            linePoints.push(p0.clone(), p1.clone());
            return linePoints;
          }

          if (p0d > planeD && p0d + l0d > planeD) {
            // the line is fully outside of plane
            return linePoints;
          }

          var t = (planeD - p0d) / l0d;

          if (t > 0) {
            // p0 inside of plane
            linePoints.push(p0.clone());
            linePoints.push(Vec3.add(new Vec3(), p0, l0.multiplyScalar(t)));
          } else {
            // p0 is outside of plane
            linePoints.push(Vec3.add(new Vec3(), p0, l0.multiplyScalar(t)));
            linePoints.push(p0.clone());
          }

          return linePoints;
        }

        clipTriangelByPlane(p0, p1, p2, planeN, planeD) {
          var d0 = Vec3.dot(p0, planeN) - planeD;
          var d1 = Vec3.dot(p1, planeN) - planeD;
          var d2 = Vec3.dot(p2, planeN) - planeD;
          var outsideCount = 0;
          outsideCount += d0 >= 0 ? 1 : 0;
          outsideCount += d1 >= 0 ? 1 : 0;
          outsideCount += d2 >= 0 ? 1 : 0;
          var rstPoints = [];

          if (3 == outsideCount) {
            return rstPoints;
          } else if (0 == outsideCount) {
            rstPoints.push(p0.clone());
            rstPoints.push(p1.clone());
            rstPoints.push(p2.clone());
            return rstPoints;
          } else if (1 == outsideCount) {
            var tempPoints = []; // make sure outside point location at last location

            if (d0 > 0) {
              tempPoints.push(p1, p2, p0);
            } else if (d1 > 0) {
              tempPoints.push(p2, p0, p1);
            } else {
              tempPoints.push(p0, p1, p2);
            }

            var linePoints = this.clipLineByPlane(tempPoints[1], tempPoints[2], planeN, planeD);

            if (2 == linePoints.length) {
              rstPoints.push(tempPoints[0].clone());
              rstPoints.push(tempPoints[1].clone());
              rstPoints.push(linePoints[1]);
            }

            linePoints = this.clipLineByPlane(tempPoints[0], tempPoints[2], planeN, planeD);

            if (2 == linePoints.length) {
              rstPoints.push(rstPoints[2].clone());
              rstPoints.push(linePoints[1]);
              rstPoints.push(tempPoints[0].clone());
            }
          } else if (2 == outsideCount) {
            var _tempPoints = []; // make sure outside point location at last location

            if (d0 < 0) {
              _tempPoints.push(p0, p1, p2);
            } else if (d1 < 0) {
              _tempPoints.push(p1, p2, p0);
            } else {
              _tempPoints.push(p2, p0, p1);
            }

            var line0Points = this.clipLineByPlane(_tempPoints[0], _tempPoints[1], planeN, planeD);
            var line1Points = this.clipLineByPlane(_tempPoints[0], _tempPoints[2], planeN, planeD);

            if (2 == line0Points.length && 2 == line1Points.length) {
              rstPoints.push(_tempPoints[0]);
              rstPoints.push(line0Points[1]);
              rstPoints.push(line1Points[1]);
            }
          } else {
            console.log('ERROR! impossible reach here');
          }

          return rstPoints;
        }

        clipGeometrylByPlane(inDecalVer, planeN, planeD) {
          var inVertices = inDecalVer;
          var outVertices = [];

          for (var i = 0; i < inVertices.length; i += 3) {
            var p0Vert = inVertices[i];
            var p1Vert = inVertices[i + 1];
            var p2Vert = inVertices[i + 2];
            var verts = this.clipTriangelByPlane(p0Vert.viewPos, p1Vert.viewPos, p2Vert.viewPos, planeN, planeD);

            if (3 == verts.length || 6 == verts.length) {
              var dv = new DecalVertex(verts[0], p0Vert.normal, p0Vert.uv);
              dv.applyMVInv(this.matWorldInv, this.matViewInv);
              outVertices.push(dv);
              dv = new DecalVertex(verts[1], p1Vert.normal, p1Vert.uv);
              dv.applyMVInv(this.matWorldInv, this.matViewInv);
              outVertices.push(dv);
              dv = new DecalVertex(verts[2], p2Vert.normal, p2Vert.uv);
              dv.applyMVInv(this.matWorldInv, this.matViewInv);
              outVertices.push(dv);
            }

            if (6 == verts.length) {
              var _dv2 = new DecalVertex(verts[3], p0Vert.normal, p0Vert.uv);

              _dv2.applyMVInv(this.matWorldInv, this.matViewInv);

              outVertices.push(_dv2);
              _dv2 = new DecalVertex(verts[4], p1Vert.normal, p1Vert.uv);

              _dv2.applyMVInv(this.matWorldInv, this.matViewInv);

              outVertices.push(_dv2);
              _dv2 = new DecalVertex(verts[5], p2Vert.normal, p2Vert.uv);

              _dv2.applyMVInv(this.matWorldInv, this.matViewInv);

              outVertices.push(_dv2);
            }
          }

          return outVertices;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e6d114f773e098f7be372845748dc60c5afdea40.js.map