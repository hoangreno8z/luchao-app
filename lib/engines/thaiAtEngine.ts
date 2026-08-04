export const THUONG_CO_EPOCH = 10153917;

export interface ThanViInfo {
  idx: number;
  id: string;
  name: string;
  alias: string;
  element: string;
  elementKey: string;
  direction: string;
  palaceNum: number;
  isDwell: boolean;
}

export const THAP_LUC_THAN: ThanViInfo[] = [
  { idx: 0,  id: "than",   name: "Thân",  alias: "Vũ Đức",     element: "Kim",  elementKey: "kim",  direction: "Tây Nam",   palaceNum: 7, isDwell: false },
  { idx: 1,  id: "dau",    name: "Dậu",   alias: "Thái Tộc",   element: "Kim",  elementKey: "kim",  direction: "Chính Tây", palaceNum: 7, isDwell: false },
  { idx: 2,  id: "tuat",   name: "Tuất",  alias: "Âm Chủ",     element: "Thổ",  elementKey: "tho",  direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
  { idx: 3,  id: "kien",   name: "Kiền",  alias: "Âm Đức",     element: "Kim",  elementKey: "kim",  direction: "Tây Bắc góc", palaceNum: 6, isDwell: true },
  { idx: 4,  id: "hoi",    name: "Hợi",   alias: "Đại Nghĩa",  element: "Thủy", elementKey: "thuy", direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
  { idx: 5,  id: "ty",     name: "Tý",    alias: "Địa Chủ",    element: "Thủy", elementKey: "thuy", direction: "Chính Bắc", palaceNum: 1, isDwell: false },
  { idx: 6,  id: "suu",    name: "Sửu",   alias: "Dương Đức",  element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
  { idx: 7,  id: "can",    name: "Cấn",   alias: "Hòa Đức",    element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc góc", palaceNum: 8, isDwell: true },
  { idx: 8,  id: "dan",    name: "Dần",   alias: "Lã Thân",    element: "Mộc",  elementKey: "moc",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
  { idx: 9,  id: "mao",    name: "Mão",   alias: "Cao Tùng",   element: "Mộc",  elementKey: "moc",  direction: "Chính Đông", palaceNum: 3, isDwell: false },
  { idx: 10, id: "thin",   name: "Thìn",  alias: "Thái Dương", element: "Thổ",  elementKey: "tho",  direction: "Đông Nam",  palaceNum: 4, isDwell: false },
  { idx: 11, id: "ton",    name: "Tốn",   alias: "Đại Cảnh",   element: "Mộc",  elementKey: "moc",  direction: "Đông Nam góc", palaceNum: 4, isDwell: true },
  { idx: 12, id: "ty_chi", name: "Tị",    alias: "Đại Thần",   element: "Hỏa",  elementKey: "hoa",  direction: "Đông Nam",  palaceNum: 9, isDwell: false },
  { idx: 13, id: "ngo",    name: "Ngọ",   alias: "Đại Uy",     element: "Hỏa",  elementKey: "hoa",  direction: "Chính Nam", palaceNum: 9, isDwell: false },
  { idx: 14, id: "mui",    name: "Mùi",   alias: "Thiên Đạo",  element: "Thổ",  elementKey: "tho",  direction: "Tây Nam",   palaceNum: 2, isDwell: false },
  { idx: 15, id: "khon",   name: "Khôn",  alias: "Đại Vũ",     element: "Thổ",  elementKey: "tho",  direction: "Tây Nam góc", palaceNum: 2, isDwell: true }
];

export interface StarItem {
  thanIdx: number;
  name: string;
  class: string;
  stepCount?: number;
}

export interface TuTru {
  solarDate: string;
  fullString: string;
  yearCan: string;
  yearChi: string;
  monthCan: string;
  monthChi: string;
  dayCan: string;
  dayChi: string;
  hourCan: string;
  hourChi: string;
}

export interface ThaiAtChartData {
  modeName: string;
  solarTerm: string;
  donCucName: string;
  batMon: string;
  cuuTinh: string;
  keDai?: number;
  keTieu?: number;
  keDinh?: number;
  toanChu: number | string;
  toanChuGoc?: number;
  toanKhach: number | string;
  toanKhachGoc?: number;
  toanDinh?: number | string;
  toanDinhGoc?: number;
  placement: Record<string, StarItem[]>;
  batHung: string;
  verdict: string;
  tuTru: TuTru;
  movingStars?: Array<{ name: string; currCungName: string; nextCungName: string }>;
  thaiTueData?: any;
  nhanMenhData?: any;
  luanDoanData?: any;
}

export function calculateThaiAtChart(
  mode: string,
  year: number,
  month: number,
  day: number,
  hour: number
): ThaiAtChartData {
  const solarDate = `${day}/${month}/${year} ${hour}:00`;
  const isDuongDon = month >= 2 && month <= 7;
  const donCucName = isDuongDon ? `Dương Độn (Cục Số ${((year % 72) || 72)})` : `Âm Độn (Cục Số ${((year % 72) || 72)})`;

  const placement: Record<string, StarItem[]> = {
    trung_cung: [
      { thanIdx: -1, name: "Thái Ất", class: "thai-at" },
      { thanIdx: -1, name: "Văn Xương", class: "van-xuong" }
    ]
  };

  THAP_LUC_THAN.forEach(than => {
    placement[than.id] = [
      { thanIdx: than.idx, name: "Chủ Tướng", class: "chu-tuong" }
    ];
  });

  return {
    modeName: mode === "tue" ? "Tuế Kể" : mode === "nguyet" ? "Nguyệt Kể" : mode === "nhat" ? "Nhật Kể" : mode === "thoi" ? "Thời Kể" : mode === "dich" ? "Quẻ Dịch" : "Bàn Nhân Mệnh",
    solarTerm: "Lập Xuân",
    donCucName,
    batMon: "Khai Môn",
    cuuTinh: "Thiên Bồng",
    keDai: (year + 12607),
    keTieu: (year % 360),
    keDinh: (year % 24),
    toanChu: 16,
    toanChuGoc: 36,
    toanKhach: 12,
    toanKhachGoc: 32,
    toanDinh: 14,
    toanDinhGoc: 34,
    placement,
    batHung: "Hòa Hợp — Cho Khách tương sinh",
    verdict: "Cục diện Thuận Lợi cho việc chủ động nắm lấy cơ hội.",
    tuTru: {
      solarDate,
      fullString: `Năm Bính Ngọ, Tháng Canh Dần, Ngày Giáp Tý, Giờ Bính Tý`,
      yearCan: "Bính", yearChi: "Ngọ",
      monthCan: "Canh", monthChi: "Dần",
      dayCan: "Giáp", dayChi: "Tý",
      hourCan: "Bính", hourChi: "Tý"
    }
  };
}
