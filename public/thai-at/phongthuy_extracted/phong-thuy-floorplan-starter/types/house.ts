export type RoomType =
  | "living"
  | "bedroom"
  | "kitchen"
  | "wc"
  | "altar"
  | "stairs"
  | "dining"
  | "office"
  | "garage"
  | "yard"
  | "balcony"
  | "laundry"
  | "corridor";

export type HouseTypology = "tube" | "villa" | "l_shape" | "square";

export type Direction8 = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type Direction24 =
  | "Tý" | "Quý" | "Sửu" | "Cấn" | "Dần" | "Giáp"
  | "Mão" | "Ất" | "Thìn" | "Tốn" | "Tị" | "Bính"
  | "Ngọ" | "Đinh" | "Mùi" | "Khôn" | "Thân" | "Canh"
  | "Dậu" | "Tân" | "Tuất" | "Càn" | "Hợi" | "Nhâm";

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RoomSpec {
  type: RoomType;
  quantity: number;
}

export interface FloorConfig {
  floorNumber: number;
  name: string;
  rooms: RoomSpec[];
}

export interface HouseConfig {
  ownerName: string;
  birthYear: number;
  gender: "male" | "female";
  widthMm: number;
  depthMm: number;
  northAngleDeg: number;
  entranceDirection: string;
  year: number; // Calculation year (Niên tinh)
  constructionPeriod: number; // Vận (e.g., 8, 9)
  typology: HouseTypology;
  floorsCount: number;
  activeFloor: number;
  floors: FloorConfig[];
}

export interface Room extends Rect {
  id: string;
  type: RoomType;
  name: string;
  areaM2: number;
  floor: number;
  direction?: string;
  auspiciousness?: "good" | "bad" | "neutral";
  auspiciousReason?: string;
}

export interface Wall {
  id: string;
  a: Point;
  b: Point;
  thickness: number;
  isExterior?: boolean;
}

export interface Door {
  id: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  type: "single" | "double" | "sliding" | "balcony";
  roomRef?: string;
  label?: string;
  luBanRating?: "good" | "bad";
  luBanText?: string;
}

export interface Window {
  id: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  luBanRating?: "good" | "bad";
  luBanText?: string;
}

export interface Furniture {
  id: string;
  type:
    | "bed"
    | "sofa"
    | "counter"
    | "altar"
    | "stairs"
    | "wc"
    | "dining"
    | "desk"
    | "wardrobe"
    | "tv_unit"
    | "shower"
    | "sink"
    | "car"
    | "plant"
    | "fridge"
    | "washing_machine";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  label?: string;
  facingAngle?: number;
  rating?: "good" | "bad" | "neutral";
  note?: string;
}

export interface AxisLine {
  id: string;
  name: string;
  isVertical: boolean;
  coord: number;
}

export interface DimensionLine {
  id: string;
  start: Point;
  end: Point;
  valueMm: number;
  offset: number;
  orientation: "horizontal" | "vertical";
  label?: string;
}

export interface FloorGeometry {
  floorNumber: number;
  name: string;
  widthMm: number;
  depthMm: number;
  rooms: Room[];
  walls: Wall[];
  doors: Door[];
  windows: Window[];
  furniture: Furniture[];
  axisLines: AxisLine[];
  dimensionLines: DimensionLine[];
  center: Point;
}

export interface HouseGeometry {
  widthMm: number;
  depthMm: number;
  northAngleDeg: number;
  center: Point;
  floors: FloorGeometry[];
  activeFloor: number;
  currentFloor: FloorGeometry;
}

// ================= FENG SHUI TYPES =================

export type BatQuaiName = "Khảm" | "Cấn" | "Chấn" | "Tốn" | "Ly" | "Khôn" | "Đoài" | "Càn";
export type NguHanh = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
export type BatTrachStar =
  | "Sinh Khí"
  | "Thiên Y"
  | "Diên Niên"
  | "Phục Vị"
  | "Tuyệt Mệnh"
  | "Ngũ Quỷ"
  | "Lục Sát"
  | "Họa Hại";

export interface MenhInfo {
  birthYear: number;
  lunarYearName: string; // e.g., "Ất Sửu 1985"
  gender: "male" | "female";
  quaiNumber: number; // 1..9
  quaiMenh: BatQuaiName;
  nguHanh: NguHanh;
  dongTayMenh: "Đông Tứ Mệnh" | "Tây Tứ Mệnh";
  goodDirections: { direction: Direction8; star: BatTrachStar; vietName: string; meaning: string; rank: number }[];
  badDirections: { direction: Direction8; star: BatTrachStar; vietName: string; meaning: string; rank: number }[];
  starByDirection: Record<Direction8, { star: BatTrachStar; isGood: boolean; meaning: string; element: NguHanh }>;
}

export interface PhiTinhPalace {
  palaceIndex: number; // 1..9
  direction: Direction8 | "CENTER";
  vietDirection: string;
  baseStar: number; // Vận tinh
  mountainStar: number; // Tọa tinh (Sơn tinh)
  waterStar: number; // Hướng tinh
  annualStar: number; // Niên tinh
  baseElementName: NguHanh;
  evaluation: string;
  isProsperous: boolean;
  rect: Rect;
}

export interface PhiTinhResult {
  period: number; // Vận (e.g. 9)
  facingDegree: number; // Hướng độ
  facingDirection24: Direction24;
  sittingDirection24: Direction24;
  periodStarCenter: number;
  isThuậnSơnThuậnHướng: boolean;
  palaces: PhiTinhPalace[];
}

export interface LuBanCheckResult {
  dimensionMm: number;
  dimensionCm: number;
  rulerType: "52.2" | "42.9" | "38.8";
  rulerName: string;
  mainPalace: string;
  subPalace: string;
  isGood: boolean;
  color: "#ef4444" | "#22c55e";
  advice: string;
  suggestedGoodMm?: number[];
}

export interface FengShuiAdviceItem {
  id: string;
  category: "cửa_chính" | "ban_thờ" | "bếp" | "phòng_ngủ" | "nhà_vệ_sinh" | "cầu_thang" | "tổng_quan";
  title: string;
  status: "good" | "bad" | "warning";
  currentPositionText: string;
  analysis: string;
  remedy?: string;
}

export interface FengShuiReport {
  score: number; // 0..100
  overallVerdict: string;
  menh: MenhInfo;
  facingSon24: Direction24;
  sittingSon24: Direction24;
  phiTinh: PhiTinhResult;
  advices: FengShuiAdviceItem[];
  luBanSummary: {
    mainDoor: LuBanCheckResult;
    altar?: LuBanCheckResult;
    kitchen?: LuBanCheckResult;
  };
}

export interface Palace {
  id: string;
  row: number;
  col: number;
  direction: string;
  vietDirection: string;
  rect: Rect;
  annualNumber: number;
  starName?: BatTrachStar;
  isGood?: boolean;
  mountainStar?: number;
  waterStar?: number;
}

export interface FengShuiResult {
  center: Point;
  palaces: Palace[];
  northAngleDeg: number;
  year: number;
  ruleSetId: string;
  report: FengShuiReport;
}
