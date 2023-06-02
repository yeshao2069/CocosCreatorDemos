/****************************************************************************
 Copyright (c) 2017-2021 Xiamen Yaji Software Co., Ltd.
 https://www.cocos.com/
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.
 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

import { math, Rect, Vec2 } from "cc";

// 这个类是从2.4.x版本移植过来的，应对当前的需求是足够的
// muxiandong 2021-03-26

/**
 * !#en Intersection helper class
 * !#zh 辅助类，用于测试形状与形状是否相交
 * @class Intersection
 * @static
 */
 export class Intersection {
   /**
    * !#en Test line and line
    * !#zh 测试线段与线段是否相交
    * @method lineLine
    * @param {Vec2} a1 - The start point of the first line
    * @param {Vec2} a2 - The end point of the first line
    * @param {Vec2} b1 - The start point of the second line
    * @param {Vec2} b2 - The end point of the second line
    * @return {boolean}
    */
    public static lineLine ( a1: Vec2, a2: Vec2, b1: Vec2, b2: Vec2 ) : boolean {
        // jshint camelcase:false

        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if ( u_b !== 0 ) {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;

            if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
                return true;
            }
        }

        return false;
    }

    /**
     * !#en Test line and rect
     * !#zh 测试线段与矩形是否相交
     * @method lineRect
     * @param {Vec2} a1 - The start point of the line
     * @param {Vec2} a2 - The end point of the line
     * @param {Rect} b - The rect
     * @return {boolean}
     */
    public static lineRect ( a1: Vec2, a2: Vec2, b: Rect ) : boolean {
        var r0 = new Vec2( b.x, b.y );
        var r1 = new Vec2( b.x, b.yMax );
        var r2 = new Vec2( b.xMax, b.yMax );
        var r3 = new Vec2( b.xMax, b.y );

        if ( this.lineLine( a1, a2, r0, r1 ) )
            return true;

        if ( this.lineLine( a1, a2, r1, r2 ) )
            return true;

        if ( this.lineLine( a1, a2, r2, r3 ) )
            return true;

        if ( this.lineLine( a1, a2, r3, r0 ) )
            return true;

        return false;
    }

    /**
     * !#en Test line and polygon
     * !#zh 测试线段与多边形是否相交
     * @method linePolygon
     * @param {Vec2} a1 - The start point of the line
     * @param {Vec2} a2 - The end point of the line
     * @param {Vec2[]} b - The polygon, a set of points
     * @return {boolean}
     */
    public static linePolygon ( a1: Vec2, a2: Vec2, b: Vec2[] ) : boolean {
        var length = b.length;

        for ( var i = 0; i < length; ++i ) {
            var b1 = b[i];
            var b2 = b[(i+1)%length];

            if ( this.lineLine( a1, a2, b1, b2 ) )
                return true;
        }

        return false;
    }

    /**
     * !#en Test rect and rect
     * !#zh 测试矩形与矩形是否相交
     * @method rectRect
     * @param {Rect} a - The first rect
     * @param {Rect} b - The second rect
     * @return {boolean}
     */
    public static rectRect ( a: Rect, b: Rect ) {
        // jshint camelcase:false

        var a_min_x = a.x;
        var a_min_y = a.y;
        var a_max_x = a.x + a.width;
        var a_max_y = a.y + a.height;

        var b_min_x = b.x;
        var b_min_y = b.y;
        var b_max_x = b.x + b.width;
        var b_max_y = b.y + b.height;

        return a_min_x <= b_max_x &&
            a_max_x >= b_min_x &&
            a_min_y <= b_max_y &&
            a_max_y >= b_min_y
            ;
    }

    /**
     * !#en Test rect and polygon
     * !#zh 测试矩形与多边形是否相交
     * @method rectPolygon
     * @param {Rect} a - The rect
     * @param {Vec2[]} b - The polygon, a set of points
     * @return {boolean}
     */
    public static rectPolygon ( a: Rect, b: Vec2[] ) : boolean {
        var i, l;
        var r0 = new Vec2( a.x, a.y );
        var r1 = new Vec2( a.x, a.yMax );
        var r2 = new Vec2( a.xMax, a.yMax );
        var r3 = new Vec2( a.xMax, a.y );

        // intersection check
        if ( this.linePolygon( r0, r1, b ) )
            return true;

        if ( this.linePolygon( r1, r2, b ) )
            return true;

        if ( this.linePolygon( r2, r3, b ) )
            return true;

        if ( this.linePolygon( r3, r0, b ) )
            return true;

        // check if a contains b
        // for ( i = 0, l = b.length; i < l; ++i ) {
        //     if ( this.pointInPolygon(b[i], a) )
        //         return true;
        // }

        // check if b contains a
        if ( this.pointInPolygon(r0, b) )
            return true;

        if ( this.pointInPolygon(r1, b) )
            return true;

        if ( this.pointInPolygon(r2, b) )
            return true;

        if ( this.pointInPolygon(r3, b) )
            return true;

        return false;
    }

    /**
     * !#en Test polygon and polygon
     * !#zh 测试多边形与多边形是否相交
     * @method polygonPolygon
     * @param {Vec2[]} a - The first polygon, a set of points
     * @param {Vec2[]} b - The second polygon, a set of points
     * @return {boolean}
     */
    public static polygonPolygon ( a: Vec2[], b: Vec2[] ) : boolean {
        var i, l;

        // check if a intersects b
        for ( i = 0, l = a.length; i < l; ++i ) {
            var a1 = a[i];
            var a2 = a[(i+1)%l];

            if ( this.linePolygon( a1, a2, b ) )
                return true;
        }

        // check if a contains b
        for ( i = 0, l = b.length; i < l; ++i ) {
            if ( this.pointInPolygon(b[i], a) )
                return true;
        }

        // check if b contains a
        for ( i = 0, l = a.length; i < l; ++i ) {
            if ( this.pointInPolygon( a[i], b ) )
                return true;
        }

        return false;
    }

    /**
     * !#en Test circle and circle
     * !#zh 测试圆形与圆形是否相交
     * @method circleCircle
     * @param {Object} a - Object contains position and radius
     * @param {Object} b - Object contains position and radius
     * @return {boolean}
     * @typescript circleCircle(a: {position: Vec2, radius: number}, b: {position: Vec2, radius: number}): boolean
     */
    public static circleCircle (a: Object, b: Object) : boolean {
        var distance = (a as any).position.sub((b as any).position).mag();
        return distance < ((a as any).radius + (b as any).radius);
    }

    /**
     * !#en Test polygon and circle
     * !#zh 测试矩形与圆形是否相交
     * @method polygonCircle
     * @param {Vec2[]} polygon - The Polygon, a set of points
     * @param {Object} circle - Object contains position and radius
     * @return {boolean}
     * @typescript polygonCircle(polygon: Vec2[], circle: {position: Vec2, radius: number}): boolean
     */
    public static polygonCircle (polygon: Vec2[], circle: Object) : boolean{
        var position = (circle as any).position;
        if (this.pointInPolygon(position, polygon)) {
            return true;
        }

        for (var i = 0, l = polygon.length; i < l; i++) {
            var start = i === 0 ? polygon[polygon.length - 1] : polygon[i- 1];
            var end = polygon[i];

            if (this.pointLineDistance(position, start, end, true) < (circle as any).radius) {
                return true;
            }
        }

        return false;
    }

    /**
     * !#en Test whether the point is in the polygon
     * !#zh 测试一个点是否在一个多边形中
     * @method pointInPolygon
     * @param {Vec2} point - The point
     * @param {Vec2[]} polygon - The polygon, a set of points
     * @return {boolean}
     */
    public static pointInPolygon (point: Vec2, polygon: Vec2[]) : boolean {
        var inside = false;
        var x = point.x;
        var y = point.y;

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        var length = polygon.length;

        for ( var i = 0, j = length-1; i < length; j = i++ ) {
            var xi = polygon[i].x, yi = polygon[i].y,
                xj = polygon[j].x, yj = polygon[j].y,
                intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if ( intersect ) inside = !inside;
        }

        return inside;
    }

    /**
     * !#en Calculate the distance of point to line.
     * !#zh 计算点到直线的距离。如果这是一条线段并且垂足不在线段内，则会计算点到线段端点的距离。
     * @method pointLineDistance
     * @param {Vec2} point - The point
     * @param {Vec2} start - The start point of line
     * @param {Vec2} end - The end point of line
     * @param {boolean} isSegment - whether this line is a segment
     * @return {number}
     */
    public static pointLineDistance(point: Vec2, start: Vec2, end: Vec2, isSegment: boolean) : number {
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var d = dx*dx + dy*dy;
        var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
        var p;

        if (!isSegment) {
            p = new Vec2(start.x + t * dx, start.y + t * dy);
        }
        else {
            if (d) {
                if (t < 0) p = start;
                else if (t > 1) p = end;
                else p = new Vec2(start.x + t * dx, start.y + t * dy);
            }
            else {
                p = start;
            }
        }
            
        dx = point.x - p.x;
        dy = point.y - p.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
 }

 export default new Intersection();