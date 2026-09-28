// ============================================================
// Feng Shui Compass (La Kinh 24 Sơn / 72 Long / 8 Quái / 360°)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

export interface CompassSector {
    readonly index24: number;
    readonly index72: number;
    readonly bearingStart: number;
    readonly bearingCenter: number;
    readonly bearingEnd: number;
    readonly name24: string;
    readonly trigramName: string;
    readonly element: string;
}

export interface CompassOverlay {
    readonly center: { readonly x: number; readonly y: number };
    readonly rotationDeg: number;
    readonly sectors: readonly CompassSector[];
}

export const MOUNTAINS_24_LIST = [
    'Tý', 'Quý', 'Sửu', 'Cấn', 'Dần', 'Giáp', 'Mão', 'Ất',
    'Thìn', 'Tốn', 'Tỵ', 'Bính', 'Ngọ', 'Đinh', 'Mùi', 'Khôn',
    'Thân', 'Canh', 'Dậu', 'Tân', 'Tuất', 'Càn', 'Hợi', 'Nhâm'
] as const;

export const TRIGRAMS_8_LIST = [
    'Khảm (Bắc)', 'Cấn (Đông Bắc)', 'Chấn (Đông)', 'Tốn (Đông Nam)',
    'Ly (Nam)', 'Khôn (Tây Nam)', 'Đoài (Tây)', 'Càn (Tây Bắc)'
] as const;

const norm = (d: number) => ((d % 360) + 360) % 360;

export class Compass72 {
    static sectorAt(bearingDeg: number): CompassSector {
        const b = norm(bearingDeg);
        const i72 = Math.floor((b + 2.5) / 5) % 72;
        const i24 = Math.floor((b + 7.5) / 15) % 24;
        const center = norm(i72 * 5);
        const name24 = MOUNTAINS_24_LIST[i24];
        const trigramIdx = Math.floor((i24 + 1) / 3) % 8;

        return Object.freeze({
            index24: i24,
            index72: i72,
            bearingStart: norm(center - 2.5),
            bearingCenter: center,
            bearingEnd: norm(center + 2.5),
            name24,
            trigramName: TRIGRAMS_8_LIST[trigramIdx],
            element: this.getElementForMountain(name24)
        });
    }

    static build(center: { x: number; y: number }, rotationDeg = 0): CompassOverlay {
        const sectors: CompassSector[] = [];
        for (let i = 0; i < 72; i++) {
            const c = i * 5;
            const i24 = Math.floor((i + 1.5) / 3) % 24;
            const name24 = MOUNTAINS_24_LIST[i24];
            const trigramIdx = Math.floor((i24 + 1) / 3) % 8;

            sectors.push(Object.freeze({
                index24: i24,
                index72: i,
                bearingStart: norm(c - 2.5),
                bearingCenter: c,
                bearingEnd: norm(c + 2.5),
                name24,
                trigramName: TRIGRAMS_8_LIST[trigramIdx],
                element: this.getElementForMountain(name24)
            }));
        }
        return Object.freeze({
            center: Object.freeze({ x: center.x, y: center.y }),
            rotationDeg: norm(rotationDeg),
            sectors: Object.freeze(sectors)
        });
    }

    static bearingFromVector(dx: number, dy: number): number {
        return norm((Math.atan2(dx, dy) * 180) / Math.PI);
    }

    private static getElementForMountain(name: string): string {
        switch (name) {
            case 'Nhâm': case 'Tý': case 'Quý': case 'Hợi': return 'Thủy';
            case 'Giáp': case 'Mão': case 'Ất': case 'Tốn': return 'Mộc';
            case 'Bính': case 'Ngọ': case 'Đinh': case 'Tỵ': return 'Hỏa';
            case 'Sửu': case 'Cấn': case 'Dần': case 'Thìn': case 'Mùi': case 'Khôn': case 'Tuất': return 'Thổ';
            case 'Thân': case 'Canh': case 'Dậu': case 'Tân': case 'Càn': return 'Kim';
            default: return 'Thổ';
        }
    }
}
