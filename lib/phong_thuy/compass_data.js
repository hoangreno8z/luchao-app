// ============================================================
// 1. DATA LAYER (lib/phong_thuy/compass_data.js)
// Dữ liệu tĩnh 24 Sơn Hướng, 60 Long Thấu Địa, Bảng Thế Quái
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export const MOUNTAINS_24 = [
    { id: 1, name: 'Nhâm', quai: 'Khảm', palaceId: 1, hanh: 'Thủy', startDeg: 337.5, midDeg: 345, endDeg: 352.5, nguyenLong: 'Địa', amDuong: '+' },
    { id: 2, name: 'Tý', quai: 'Khảm', palaceId: 1, hanh: 'Thủy', startDeg: 352.5, midDeg: 0, endDeg: 7.5, nguyenLong: 'Thiên', amDuong: '-' },
    { id: 3, name: 'Quý', quai: 'Khảm', palaceId: 1, hanh: 'Thủy', startDeg: 7.5, midDeg: 15, endDeg: 22.5, nguyenLong: 'Nhân', amDuong: '-' },
    { id: 4, name: 'Sửu', quai: 'Cấn', palaceId: 8, hanh: 'Thổ', startDeg: 22.5, midDeg: 30, endDeg: 37.5, nguyenLong: 'Địa', amDuong: '-' },
    { id: 5, name: 'Cấn', quai: 'Cấn', palaceId: 8, hanh: 'Thổ', startDeg: 37.5, midDeg: 45, endDeg: 52.5, nguyenLong: 'Thiên', amDuong: '+' },
    { id: 6, name: 'Dần', quai: 'Cấn', palaceId: 8, hanh: 'Mộc', startDeg: 52.5, midDeg: 60, endDeg: 67.5, nguyenLong: 'Nhân', amDuong: '+' },
    { id: 7, name: 'Giáp', quai: 'Chấn', palaceId: 3, hanh: 'Mộc', startDeg: 67.5, midDeg: 75, endDeg: 82.5, nguyenLong: 'Địa', amDuong: '+' },
    { id: 8, name: 'Mão', quai: 'Chấn', palaceId: 3, hanh: 'Mộc', startDeg: 82.5, midDeg: 90, endDeg: 97.5, nguyenLong: 'Thiên', amDuong: '-' },
    { id: 9, name: 'Ất', quai: 'Chấn', palaceId: 3, hanh: 'Mộc', startDeg: 97.5, midDeg: 105, endDeg: 112.5, nguyenLong: 'Nhân', amDuong: '-' },
    { id: 10, name: 'Thìn', quai: 'Tốn', palaceId: 4, hanh: 'Thổ', startDeg: 112.5, midDeg: 120, endDeg: 127.5, nguyenLong: 'Địa', amDuong: '-' },
    { id: 11, name: 'Tốn', quai: 'Tốn', palaceId: 4, hanh: 'Mộc', startDeg: 127.5, midDeg: 135, endDeg: 142.5, nguyenLong: 'Thiên', amDuong: '+' },
    { id: 12, name: 'Tỵ', quai: 'Tốn', palaceId: 4, hanh: 'Hỏa', startDeg: 142.5, midDeg: 150, endDeg: 157.5, nguyenLong: 'Nhân', amDuong: '+' },
    { id: 13, name: 'Bính', quai: 'Ly', palaceId: 9, hanh: 'Hỏa', startDeg: 157.5, midDeg: 165, endDeg: 172.5, nguyenLong: 'Địa', amDuong: '+' },
    { id: 14, name: 'Ngọ', quai: 'Ly', palaceId: 9, hanh: 'Hỏa', startDeg: 172.5, midDeg: 180, endDeg: 187.5, nguyenLong: 'Thiên', amDuong: '-' },
    { id: 15, name: 'Đinh', quai: 'Ly', palaceId: 9, hanh: 'Hỏa', startDeg: 187.5, midDeg: 195, endDeg: 202.5, nguyenLong: 'Nhân', amDuong: '-' },
    { id: 16, name: 'Mùi', quai: 'Khôn', palaceId: 2, hanh: 'Thổ', startDeg: 202.5, midDeg: 210, endDeg: 217.5, nguyenLong: 'Địa', amDuong: '-' },
    { id: 17, name: 'Khôn', quai: 'Khôn', palaceId: 2, hanh: 'Thổ', startDeg: 217.5, midDeg: 225, endDeg: 232.5, nguyenLong: 'Thiên', amDuong: '+' },
    { id: 18, name: 'Thân', quai: 'Khôn', palaceId: 2, hanh: 'Kim', startDeg: 232.5, midDeg: 240, endDeg: 247.5, nguyenLong: 'Nhân', amDuong: '+' },
    { id: 19, name: 'Canh', quai: 'Đoài', palaceId: 7, hanh: 'Kim', startDeg: 247.5, midDeg: 255, endDeg: 262.5, nguyenLong: 'Địa', amDuong: '+' },
    { id: 20, name: 'Dậu', quai: 'Đoài', palaceId: 7, hanh: 'Kim', startDeg: 262.5, midDeg: 270, endDeg: 277.5, nguyenLong: 'Thiên', amDuong: '-' },
    { id: 21, name: 'Tân', quai: 'Đoài', palaceId: 7, hanh: 'Kim', startDeg: 277.5, midDeg: 285, endDeg: 292.5, nguyenLong: 'Nhân', amDuong: '-' },
    { id: 22, name: 'Tuất', quai: 'Càn', palaceId: 6, hanh: 'Thổ', startDeg: 292.5, midDeg: 300, endDeg: 307.5, nguyenLong: 'Địa', amDuong: '-' },
    { id: 23, name: 'Càn', quai: 'Càn', palaceId: 6, hanh: 'Kim', startDeg: 307.5, midDeg: 315, endDeg: 322.5, nguyenLong: 'Thiên', amDuong: '+' },
    { id: 24, name: 'Hợi', quai: 'Càn', palaceId: 6, hanh: 'Thủy', startDeg: 322.5, midDeg: 330, endDeg: 337.5, nguyenLong: 'Nhân', amDuong: '+' }
];

const CAN_CHI_60 = [
    'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi', 'Nhâm Thân', 'Quý Dậu',
    'Giáp Tuất', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Kỷ Mão', 'Canh Thìn', 'Tân Tỵ', 'Nhâm Ngọ', 'Quý Mùi',
    'Giáp Thân', 'Ất Dậu', 'Bính Tuất', 'Đinh Hợi', 'Mậu Tý', 'Kỷ Sửu', 'Canh Dần', 'Tân Mão', 'Nhâm Thìn', 'Quý Tỵ',
    'Giáp Ngọ', 'Ất Mùi', 'Bính Thân', 'Đinh Dậu', 'Mậu Tuất', 'Kỷ Hợi', 'Canh Tý', 'Tân Sửu', 'Nhâm Dần', 'Quý Mão',
    'Giáp Thìn', 'Ất Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi', 'Nhâm Tý', 'Quý Sửu',
    'Giáp Dần', 'Ất Mão', 'Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân', 'Tân Dậu', 'Nhâm Tuất', 'Quý Hợi'
];

export const SIXTY_DRAGONS = CAN_CHI_60.map((canChi, index) => {
    const startDeg = (337.5 + index * 6) % 360;
    const endDeg = (337.5 + (index + 1) * 6) % 360;
    return {
        id: index + 1,
        name: canChi,
        canChi,
        startDeg,
        endDeg
    };
});

// Bảng Tra Thế Quái (Kiêm Hướng khi lệch >= 3 độ)
export const REPLACEMENT_STARS = {
    'Giáp': 1, 'Thân': 1, 'Quý': 1, 'Tý': 1,
    'Khôn': 2, 'Nhâm': 2, 'Ất': 2, 'Mão': 2,
    'Càn': 6, 'Hợi': 6, 'Cấn': 6, 'Dần': 6,
    'Tốn': 4, 'Tỵ': 4, 'Bính': 4,
    'Ngọ': 9, 'Đinh': 9,
    'Dậu': 7, 'Tân': 7, 'Canh': 7
};

export const PALACE_NAMES = {
    1: 'Khảm (Bắc)',
    2: 'Khôn (Tây Nam)',
    3: 'Chấn (Đông)',
    4: 'Tốn (Đông Nam)',
    5: 'Trung Cung',
    6: 'Càn (Tây Bắc)',
    7: 'Đoài (Tây)',
    8: 'Cấn (Đông Bắc)',
    9: 'Ly (Nam)'
};

export const PALACE_SHORT = {
    1: 'BẮC',
    2: 'TÂY NAM',
    3: 'ĐÔNG',
    4: 'ĐÔNG NAM',
    5: 'TRUNG CUNG',
    6: 'TÂY BẮC',
    7: 'TÂY',
    8: 'ĐÔNG BẮC',
    9: 'NAM'
};

export const LO_SHU_PATHS = [5, 6, 7, 8, 9, 1, 2, 3, 4];
