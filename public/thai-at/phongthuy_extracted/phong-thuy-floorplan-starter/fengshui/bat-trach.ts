import type {
  BatQuaiName,
  BatTrachStar,
  Direction8,
  MenhInfo,
  NguHanh,
} from "@/types/house";

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function getCanChiYear(birthYear: number): string {
  const canIndex = (birthYear + 6) % 10;
  const chiIndex = (birthYear + 8) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]} (${birthYear})`;
}

export function calculateQuaiMenh(
  birthYear: number,
  gender: "male" | "female"
): { quaiNumber: number; quaiMenh: BatQuaiName; nguHanh: NguHanh; dongTayMenh: "Đông Tứ Mệnh" | "Tây Tứ Mệnh" } {
  // Sum of birth year digits
  const sumDigits = (n: number): number => {
    let s = n
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    while (s > 9) {
      s = s
        .toString()
        .split("")
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return s;
  };

  const s = sumDigits(birthYear);
  let quaiNumber: number;

  if (birthYear < 2000) {
    if (gender === "male") {
      quaiNumber = 10 - s;
      if (quaiNumber === 0) quaiNumber = 9;
      if (quaiNumber === 5) quaiNumber = 2; // Nam quy Khôn (2)
    } else {
      quaiNumber = (s + 5) % 9;
      if (quaiNumber === 0) quaiNumber = 9;
      if (quaiNumber === 5) quaiNumber = 8; // Nữ quy Cấn (8)
    }
  } else {
    if (gender === "male") {
      quaiNumber = 9 - s;
      if (quaiNumber <= 0) quaiNumber += 9;
      if (quaiNumber === 5) quaiNumber = 2; // Nam quy Khôn (2)
    } else {
      quaiNumber = (s + 6) % 9;
      if (quaiNumber === 0) quaiNumber = 9;
      if (quaiNumber === 5) quaiNumber = 8; // Nữ quy Cấn (8)
    }
  }

  const mapQuai: Record<number, { name: BatQuaiName; element: NguHanh; group: "Đông Tứ Mệnh" | "Tây Tứ Mệnh" }> = {
    1: { name: "Khảm", element: "Thủy", group: "Đông Tứ Mệnh" },
    2: { name: "Khôn", element: "Thổ", group: "Tây Tứ Mệnh" },
    3: { name: "Chấn", element: "Mộc", group: "Đông Tứ Mệnh" },
    4: { name: "Tốn", element: "Mộc", group: "Đông Tứ Mệnh" },
    6: { name: "Càn", element: "Kim", group: "Tây Tứ Mệnh" },
    7: { name: "Đoài", element: "Kim", group: "Tây Tứ Mệnh" },
    8: { name: "Cấn", element: "Thổ", group: "Tây Tứ Mệnh" },
    9: { name: "Ly", element: "Hỏa", group: "Đông Tứ Mệnh" },
  };

  const item = mapQuai[quaiNumber] ?? { name: "Khảm", element: "Thủy", group: "Đông Tứ Mệnh" };
  return {
    quaiNumber,
    quaiMenh: item.name,
    nguHanh: item.element,
    dongTayMenh: item.group,
  };
}

const STAR_INFO: Record<BatTrachStar, { meaning: string; isGood: boolean; element: NguHanh; rank: number }> = {
  "Sinh Khí": { meaning: "Đại Cát: Thu hút tài lộc, danh tiếng, thăng quan tiến chức, vượng khí dồi dào.", isGood: true, element: "Mộc", rank: 1 },
  "Thiên Y": { meaning: "Thượng Cát: Sức khỏe dồi dào, trường thọ, gia tăng tài sản, quý nhân phù trợ.", isGood: true, element: "Thổ", rank: 2 },
  "Diên Niên": { meaning: "Kiết Tinh: Gia đạo thuận hòa, tình duyên bền chặt, quan hệ ngoại giao tốt đẹp.", isGood: true, element: "Kim", rank: 3 },
  "Phục Vị": { meaning: "Thứ Cát: Bình yên, may mắn thi cử, nâng cao sức mạnh tinh thần, an định.", isGood: true, element: "Mộc", rank: 4 },
  "Tuyệt Mệnh": { meaning: "Đại Hung: Phá sản, bệnh tật hiểm nghèo, tai họa lớn, suy thoái sinh khí.", isGood: false, element: "Kim", rank: 8 },
  "Ngũ Quỷ": { meaning: "Đại Hung: Hao tài tán của, thị phi, tranh chấp kiện tụng, rủi ro hỏa hoạn.", isGood: false, element: "Hỏa", rank: 7 },
  "Lục Sát": { meaning: "Thứ Hung: Xáo trộn tình cảm, thù hận, tai nạn bất ngờ, hao tổn nhân đinh.", isGood: false, element: "Thủy", rank: 6 },
  "Họa Hại": { meaning: "Thứ Hung: Dễ gặp rắc rối thị phi, mưu sự khó thành, mâu thuẫn bất hòa.", isGood: false, element: "Thổ", rank: 5 },
};

const BAT_TRACH_TABLE: Record<BatQuaiName, Record<Direction8, BatTrachStar>> = {
  Khảm: {
    N: "Phục Vị",
    NE: "Ngũ Quỷ",
    E: "Thiên Y",
    SE: "Sinh Khí",
    S: "Diên Niên",
    SW: "Tuyệt Mệnh",
    W: "Họa Hại",
    NW: "Lục Sát",
  },
  Khôn: {
    N: "Tuyệt Mệnh",
    NE: "Sinh Khí",
    E: "Họa Hại",
    SE: "Ngũ Quỷ",
    S: "Lục Sát",
    SW: "Phục Vị",
    W: "Thiên Y",
    NW: "Diên Niên",
  },
  Chấn: {
    N: "Thiên Y",
    NE: "Lục Sát",
    E: "Phục Vị",
    SE: "Diên Niên",
    S: "Sinh Khí",
    SW: "Họa Hại",
    W: "Tuyệt Mệnh",
    NW: "Ngũ Quỷ",
  },
  Tốn: {
    N: "Sinh Khí",
    NE: "Tuyệt Mệnh",
    E: "Diên Niên",
    SE: "Phục Vị",
    S: "Thiên Y",
    SW: "Ngũ Quỷ",
    W: "Lục Sát",
    NW: "Họa Hại",
  },
  Càn: {
    N: "Lục Sát",
    NE: "Thiên Y",
    E: "Ngũ Quỷ",
    SE: "Họa Hại",
    S: "Tuyệt Mệnh",
    SW: "Diên Niên",
    W: "Sinh Khí",
    NW: "Phục Vị",
  },
  Đoài: {
    N: "Họa Hại",
    NE: "Diên Niên",
    E: "Tuyệt Mệnh",
    SE: "Lục Sát",
    S: "Ngũ Quỷ",
    SW: "Thiên Y",
    W: "Phục Vị",
    NW: "Sinh Khí",
  },
  Cấn: {
    N: "Ngũ Quỷ",
    NE: "Phục Vị",
    E: "Lục Sát",
    SE: "Tuyệt Mệnh",
    S: "Họa Hại",
    SW: "Sinh Khí",
    W: "Diên Niên",
    NW: "Thiên Y",
  },
  Ly: {
    N: "Diên Niên",
    NE: "Họa Hại",
    E: "Sinh Khí",
    SE: "Thiên Y",
    S: "Phục Vị",
    SW: "Lục Sát",
    W: "Ngũ Quỷ",
    NW: "Tuyệt Mệnh",
  },
};

export const DIRECTION_VIETNAMESE: Record<Direction8 | "CENTER", string> = {
  N: "Bắc",
  NE: "Đông Bắc",
  E: "Đông",
  SE: "Đông Nam",
  S: "Nam",
  SW: "Tây Nam",
  W: "Tây",
  NW: "Tây Bắc",
  CENTER: "Trung Cung",
};

export function getMenhInfo(birthYear: number, gender: "male" | "female"): MenhInfo {
  const lunarYearName = getCanChiYear(birthYear);
  const { quaiNumber, quaiMenh, nguHanh, dongTayMenh } = calculateQuaiMenh(birthYear, gender);

  const starMapping = BAT_TRACH_TABLE[quaiMenh];
  const starByDirection = {} as MenhInfo["starByDirection"];
  const goodDirections: MenhInfo["goodDirections"] = [];
  const badDirections: MenhInfo["badDirections"] = [];

  (Object.keys(starMapping) as Direction8[]).forEach((dir) => {
    const star = starMapping[dir];
    const info = STAR_INFO[star];
    starByDirection[dir] = {
      star,
      isGood: info.isGood,
      meaning: info.meaning,
      element: info.element,
    };

    if (info.isGood) {
      goodDirections.push({
        direction: dir,
        star,
        vietName: DIRECTION_VIETNAMESE[dir],
        meaning: info.meaning,
        rank: info.rank,
      });
    } else {
      badDirections.push({
        direction: dir,
        star,
        vietName: DIRECTION_VIETNAMESE[dir],
        meaning: info.meaning,
        rank: info.rank,
      });
    }
  });

  goodDirections.sort((a, b) => a.rank - b.rank);
  badDirections.sort((a, b) => b.rank - a.rank); // worst first

  return {
    birthYear,
    lunarYearName,
    gender,
    quaiNumber,
    quaiMenh,
    nguHanh,
    dongTayMenh,
    goodDirections,
    badDirections,
    starByDirection,
  };
}
