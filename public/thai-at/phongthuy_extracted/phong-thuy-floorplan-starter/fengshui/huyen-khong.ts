import type { Direction8, HuyenKhongPalace, HuyenKhongResult, Mountain24 } from "@/types/house";

export const MOUNTAINS_24: Mountain24[] = [
  { name: "Quý", direction: "N", angleMin: 7.5, angleMax: 22.5, polarity: "-" },
  { name: "Sửu", direction: "NE", angleMin: 22.5, angleMax: 37.5, polarity: "-" },
  { name: "Cấn", direction: "NE", angleMin: 37.5, angleMax: 52.5, polarity: "+" },
  { name: "Dần", direction: "NE", angleMin: 52.5, angleMax: 67.5, polarity: "+" },
  { name: "Giáp", direction: "E", angleMin: 67.5, angleMax: 82.5, polarity: "+" },
  { name: "Mão", direction: "E", angleMin: 82.5, angleMax: 97.5, polarity: "-" },
  { name: "Ất", direction: "E", angleMin: 97.5, angleMax: 112.5, polarity: "-" },
  { name: "Thìn", direction: "SE", angleMin: 112.5, angleMax: 127.5, polarity: "-" },
  { name: "Tốn", direction: "SE", angleMin: 127.5, angleMax: 142.5, polarity: "+" },
  { name: "Tị", direction: "SE", angleMin: 142.5, angleMax: 157.5, polarity: "+" },
  { name: "Bính", direction: "S", angleMin: 157.5, angleMax: 172.5, polarity: "+" },
  { name: "Ngọ", direction: "S", angleMin: 172.5, angleMax: 187.5, polarity: "-" },
  { name: "Đinh", direction: "S", angleMin: 187.5, angleMax: 202.5, polarity: "-" },
  { name: "Mùi", direction: "SW", angleMin: 202.5, angleMax: 217.5, polarity: "-" },
  { name: "Khôn", direction: "SW", angleMin: 217.5, angleMax: 232.5, polarity: "+" },
  { name: "Thân", direction: "SW", angleMin: 232.5, angleMax: 247.5, polarity: "+" },
  { name: "Canh", direction: "W", angleMin: 247.5, angleMax: 262.5, polarity: "+" },
  { name: "Dậu", direction: "W", angleMin: 262.5, angleMax: 277.5, polarity: "-" },
  { name: "Tân", direction: "W", angleMin: 277.5, angleMax: 292.5, polarity: "-" },
  { name: "Tuất", direction: "NW", angleMin: 292.5, angleMax: 307.5, polarity: "-" },
  { name: "Càn", direction: "NW", angleMin: 307.5, angleMax: 322.5, polarity: "+" },
  { name: "Hợi", direction: "NW", angleMin: 322.5, angleMax: 337.5, polarity: "+" },
  { name: "Nhâm", direction: "N", angleMin: 337.5, angleMax: 352.5, polarity: "+" },
  { name: "Tý", direction: "N", angleMin: 352.5, angleMax: 7.5, polarity: "-" },
];

export const STAR_NAMES: Record<number, string> = {
  1: "Nhất Bạch (Tham Lang - Thủy)",
  2: "Nhị Hắc (Cự Môn - Thổ)",
  3: "Tam Bích (Lộc Tồn - Mộc)",
  4: "Tứ Lục (Văn Khúc - Mộc)",
  5: "Ngũ Hoàng (Liêm Trinh - Thổ)",
  6: "Lục Bạch (Vũ Khúc - Kim)",
  7: "Thất Xích (Phá Quân - Kim)",
  8: "Bát Bạch (Tả Phù - Thổ)",
  9: "Cửu Tử (Hữu Bật - Hỏa)",
};

// Luo Shu flight order through 9 positions:
// Center (0) -> NW (1) -> W (2) -> NE (3) -> S (4) -> N (5) -> SW (6) -> E (7) -> SE (8)
const FLIGHT_PATH: Array<Direction8 | "CENTER"> = [
  "CENTER",
  "NW",
  "W",
  "NE",
  "S",
  "N",
  "SW",
  "E",
  "SE",
];

const DIRECTION_TO_INDEX: Record<Direction8 | "CENTER", number> = {
  CENTER: 0,
  NW: 1,
  W: 2,
  NE: 3,
  S: 4,
  N: 5,
  SW: 6,
  E: 7,
  SE: 8,
};

export function getMountainFromAngle(degrees: number): Mountain24 {
  const norm = ((degrees % 360) + 360) % 360;
  for (const m of MOUNTAINS_24) {
    if (m.angleMin > m.angleMax) {
      // Crosses 0 degrees (Tý: 352.5 -> 7.5)
      if (norm >= m.angleMin || norm < m.angleMax) return m;
    } else {
      if (norm >= m.angleMin && norm < m.angleMax) return m;
    }
  }
  return MOUNTAINS_24[23]; // Tý fallback
}

export function getPeriod(year: number): number {
  if (year >= 2024 && year <= 2043) return 9;
  if (year >= 2004 && year <= 2023) return 8;
  if (year >= 1984 && year <= 2003) return 7;
  if (year >= 1964 && year <= 1983) return 6;
  if (year >= 1944 && year <= 1963) return 5;
  if (year >= 1924 && year <= 1943) return 4;
  if (year >= 1904 && year <= 1923) return 3;
  if (year >= 1884 && year <= 1903) return 2;
  if (year >= 1864 && year <= 1883) return 1;
  const p = Math.floor((year - 1864) / 20) % 9;
  return p < 0 ? p + 10 : p + 1;
}

export function flyStars(centerStar: number, forward: boolean): Record<Direction8 | "CENTER", number> {
  const result = {} as Record<Direction8 | "CENTER", number>;
  for (let step = 0; step < 9; step++) {
    const dir = FLIGHT_PATH[step];
    let star = forward ? centerStar + step : centerStar - step;
    while (star > 9) star -= 9;
    while (star < 1) star += 9;
    result[dir] = star;
  }
  return result;
}

export function getAnnualCenterStar(year: number): number {
  // 2024 is Star 3 in Center, each subsequent year decrements by 1
  let star = (3 - (year - 2024)) % 9;
  while (star <= 0) star += 9;
  return star;
}

const PALACE_TO_BASE_STAR: Record<Direction8 | "CENTER", number> = {
  N: 1,
  SW: 2,
  E: 3,
  SE: 4,
  CENTER: 5,
  NW: 6,
  W: 7,
  NE: 8,
  S: 9,
};

// Map mountain sub-index (1, 2, 3) in each palace
const PALACE_MOUNTAINS: Record<Direction8, [string, string, string]> = {
  N: ["Nhâm", "Tý", "Quý"],
  NE: ["Sửu", "Cấn", "Dần"],
  E: ["Giáp", "Mão", "Ất"],
  SE: ["Thìn", "Tốn", "Tị"],
  S: ["Bính", "Ngọ", "Đinh"],
  SW: ["Mùi", "Khôn", "Thân"],
  W: ["Canh", "Dậu", "Tân"],
  NW: ["Tuất", "Càn", "Hợi"],
};

export function getMountainSubIndex(mountainName: string, direction: Direction8): 0 | 1 | 2 {
  const list = PALACE_MOUNTAINS[direction];
  const idx = list.indexOf(mountainName);
  return (idx >= 0 ? idx : 0) as 0 | 1 | 2;
}

export function calculateHuyenKhong(
  facingAngleDeg: number,
  periodYear: number,
  currentYear: number
): HuyenKhongResult {
  const period = getPeriod(periodYear);
  const facingMountain = getMountainFromAngle(facingAngleDeg);
  const sittingAngle = (facingAngleDeg + 180) % 360;
  const sittingMountain = getMountainFromAngle(sittingAngle);

  // 1. Period Stars (Vận Tinh)
  const periodFly = flyStars(period, true);

  // 2. Determine Sitting Star (Sơn Tinh) in Center
  const sittingDir = sittingMountain.direction;
  const sittingPeriodStar = periodFly[sittingDir];

  // Determine Facing Star (Hướng Tinh) in Center
  const facingDir = facingMountain.direction;
  const facingPeriodStar = periodFly[facingDir];

  // 3. Determine Yin/Yang flight for Sitting and Facing stars
  // Sitting Mountain Sub-index
  const sittingSub = getMountainSubIndex(sittingMountain.name, sittingDir);
  const sittingTargetDir = Object.keys(PALACE_TO_BASE_STAR).find(
    (k) => PALACE_TO_BASE_STAR[k as Direction8 | "CENTER"] === sittingPeriodStar
  ) as Direction8 | "CENTER";

  let sittingPolarity = sittingMountain.polarity;
  if (sittingTargetDir && sittingTargetDir !== "CENTER") {
    const targetMountName = PALACE_MOUNTAINS[sittingTargetDir][sittingSub];
    const found = MOUNTAINS_24.find((m) => m.name === targetMountName);
    if (found) sittingPolarity = found.polarity;
  }

  const facingSub = getMountainSubIndex(facingMountain.name, facingDir);
  const facingTargetDir = Object.keys(PALACE_TO_BASE_STAR).find(
    (k) => PALACE_TO_BASE_STAR[k as Direction8 | "CENTER"] === facingPeriodStar
  ) as Direction8 | "CENTER";

  let facingPolarity = facingMountain.polarity;
  if (facingTargetDir && facingTargetDir !== "CENTER") {
    const targetMountName = PALACE_MOUNTAINS[facingTargetDir][facingSub];
    const found = MOUNTAINS_24.find((m) => m.name === targetMountName);
    if (found) facingPolarity = found.polarity;
  }

  const sittingFly = flyStars(sittingPeriodStar, sittingPolarity === "+");
  const facingFly = flyStars(facingPeriodStar, facingPolarity === "+");

  // 4. Annual Stars
  const annualCenter = getAnnualCenterStar(currentYear);
  const annualFly = flyStars(annualCenter, true);

  // Star qualities for Period 9
  const getStarQuality = (mountainStar: number, waterStar: number): { isGood: boolean; description: string } => {
    // In Period 9: 9 is Wang (旺 - ruling), 1 is Sheng (生 - growing), 2 is Jin (进 - coming)
    const isWaterGood = waterStar === 9 || waterStar === 1 || waterStar === 8;
    const isMountainGood = mountainStar === 9 || mountainStar === 1 || mountainStar === 8;
    const isDangerous = waterStar === 5 || mountainStar === 5 || waterStar === 2 || mountainStar === 2;

    let desc = `Sơn ${mountainStar} - Hướng ${waterStar}. `;
    if (waterStar === 9) desc += "Vượng tinh đắc vị tài lộc đại phát. ";
    if (mountainStar === 9) desc += "Vượng sơn vượng đinh, nhân khẩu bình an. ";
    if (waterStar === 5 || mountainStar === 5) desc += "Ngũ Hoàng đại sát đáo cung, cần hóa giải bằng Kim. ";
    if (waterStar === 2 || mountainStar === 2) desc += "Nhị Hắc bệnh phù chiếu, chú ý sức khỏe. ";
    if (waterStar === 1 || mountainStar === 1) desc += "Nhất Bạch cát tinh chiếu, lợi quan lộc công danh. ";

    return {
      isGood: (isWaterGood || isMountainGood) && !isDangerous,
      description: desc,
    };
  };

  const palaces: HuyenKhongPalace[] = FLIGHT_PATH.map((direction) => {
    const periodStar = periodFly[direction];
    const mountainStar = sittingFly[direction];
    const waterStar = facingFly[direction];
    const annualStar = annualFly[direction];
    const quality = getStarQuality(mountainStar, waterStar);

    return {
      direction,
      periodStar,
      mountainStar,
      waterStar,
      annualStar,
      isGood: quality.isGood,
      description: quality.description,
    };
  });

  return {
    period,
    facingAngleDeg,
    sittingAngleDeg: sittingAngle,
    facingMountain,
    sittingMountain,
    currentYear,
    annualCenterStar: annualCenter,
    palaces,
  };
}
