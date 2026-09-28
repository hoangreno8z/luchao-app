// ============================================================
// CAD / Feng Shui Hardening Regression Test Suite
// ============================================================

import { Compass72 } from '../core/fengshui/compass';
import { FootprintFactory } from '../core/cad/footprint';
import { TopologyNormalizer } from '../core/math/topology-normalizer';
import { GeometryMath } from '../core/math/geometry-math';
import { classifyMartinez } from '../core/engine/martinez-shape-guard';

describe('CAD/Feng Shui hardening', () => {
    test('L-shape is a real concave polygon', () => {
        const f = FootprintFactory.lShape(20, 15, 7, 6);
        const p = TopologyNormalizer.normalize({ points: f.points });
        expect(p.points.length).toBe(6);
        // 20*15 - 7*6 = 300 - 42 = 258
        expect(GeometryMath.polygonPhysicalArea(p)).toBeCloseTo(258);
    });

    test('24 mountains / 72 sectors', () => {
        const c = Compass72.sectorAt(180);
        expect(c.name24).toBe('Ngọ');
        expect(c.index72).toBe(36);
        expect(c.bearingCenter).toBe(180);
    });

    test('Martinez multi polygon is not mistaken for polygon', () => {
        expect(classifyMartinez([
            [
                [[0, 0], [1, 0], [1, 1], [0, 0]]
            ],
            [
                [[2, 2], [3, 2], [3, 3], [2, 2]]
            ]
        ])).toBe('MULTIPOLYGON');
    });
});
