// ============================================================
// CAD Footprint Model & Factory
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { Point, RawPolygon } from '../math/geometry-types';

export type FootprintKind = 'RECTANGLE' | 'L_SHAPE' | 'U_SHAPE' | 'STEPPED' | 'CONCAVE_POLYGON';

export interface Footprint {
    readonly kind: FootprintKind;
    readonly points: readonly Point[];
    readonly widthMm: number;
    readonly depthMm: number;
}

export class FootprintFactory {
    static rectangle(w: number, d: number): Footprint {
        if (w <= 0 || d <= 0) throw new Error('Invalid rectangle dimensions.');
        return {
            kind: 'RECTANGLE',
            widthMm: w,
            depthMm: d,
            points: Object.freeze([
                { x: 0, y: 0 },
                { x: w, y: 0 },
                { x: w, y: d },
                { x: 0, y: d }
            ])
        };
    }

    static lShape(w: number, d: number, cutW: number, cutD: number): Footprint {
        if (cutW <= 0 || cutD <= 0 || cutW >= w || cutD >= d) {
            throw new Error('Invalid L-shape cut dimensions.');
        }
        return {
            kind: 'L_SHAPE',
            widthMm: w,
            depthMm: d,
            points: Object.freeze([
                { x: 0, y: 0 },
                { x: w, y: 0 },
                { x: w, y: d - cutD },
                { x: w - cutW, y: d - cutD },
                { x: w - cutW, y: d },
                { x: 0, y: d }
            ])
        };
    }

    static uShape(w: number, d: number, armW: number, slotD: number): Footprint {
        if (armW <= 0 || slotD <= 0 || armW * 2 >= w || slotD >= d) {
            throw new Error('Invalid U-shape dimensions.');
        }
        return {
            kind: 'U_SHAPE',
            widthMm: w,
            depthMm: d,
            points: Object.freeze([
                { x: 0, y: 0 },
                { x: w, y: 0 },
                { x: w, y: d },
                { x: w - armW, y: d },
                { x: w - armW, y: d - slotD },
                { x: armW, y: d - slotD },
                { x: armW, y: d },
                { x: 0, y: d }
            ])
        };
    }

    static stepped(w: number, d: number, stepW: number, stepD: number): Footprint {
        if (stepW <= 0 || stepD <= 0 || stepW >= w || stepD >= d) {
            throw new Error('Invalid stepped dimensions.');
        }
        return {
            kind: 'STEPPED',
            widthMm: w,
            depthMm: d,
            points: Object.freeze([
                { x: 0, y: 0 },
                { x: w - stepW, y: 0 },
                { x: w - stepW, y: stepD },
                { x: w, y: stepD },
                { x: w, y: d },
                { x: 0, y: d }
            ])
        };
    }

    static polygon(points: readonly Point[]): Footprint {
        if (!points || points.length < 3) throw new Error('Polygon footprint requires at least 3 points.');
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const p of points) {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }
        return {
            kind: 'CONCAVE_POLYGON',
            widthMm: maxX - minX,
            depthMm: maxY - minY,
            points: Object.freeze([...points.map(p => ({ x: p.x, y: p.y }))])
        };
    }
}
