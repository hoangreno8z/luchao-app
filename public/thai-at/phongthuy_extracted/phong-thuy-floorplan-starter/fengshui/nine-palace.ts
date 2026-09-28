import type { FengShuiResult, HouseGeometry, Palace, Point } from "@/types/house";

export const DIRECTIONS = [
  ["NW","BẮC TÂY"], ["N","BẮC"], ["NE","ĐÔNG BẮC"],
  ["W","TÂY"], ["CENTER","TRUNG CUNG"], ["E","ĐÔNG"],
  ["SW","TÂY NAM"], ["S","NAM"], ["SE","ĐÔNG NAM"]
] as const;

/**
 * Annual layer is deliberately isolated. The default is a deterministic 1..9 cycle,
 * NOT a claim about any particular historical Feng Shui school. Replace annualNumberForYear()
 * with the user's authoritative annual flying-star/Lo Shu rule before production use.
 */
export function annualNumberForYear(year: number): number {
  const n = ((year - 2000) % 9 + 9) % 9;
  return n + 1;
}

export function calculateNinePalaces(geometry: HouseGeometry, year: number): FengShuiResult {
  const W = geometry.widthMm, D = geometry.depthMm;
  const cw = W/3, ch = D/3;
  const base = annualNumberForYear(year);
  const dirs = ["NW","N","NE","W","CENTER","E","SW","S","SE"];
  const palaces: Palace[] = dirs.map((direction, i) => {
    const row = Math.floor(i/3), col = i%3;
    return {
      id:`palace-${direction}`,
      row, col, direction,
      rect:{x:col*cw,y:row*ch,width:cw,height:ch},
      annualNumber: ((base + i - 1) % 9) + 1,
    };
  });
  return { center:geometry.center, palaces, northAngleDeg:geometry.northAngleDeg, year, ruleSetId:"demo-lo-shu-cycle-v1" };
}

export function directionVector(direction: string): Point {
  const map: Record<string,Point> = {
    N:{x:0,y:-1}, NE:{x:1,y:-1}, E:{x:1,y:0}, SE:{x:1,y:1}, S:{x:0,y:1}, SW:{x:-1,y:1}, W:{x:-1,y:0}, NW:{x:-1,y:-1}, CENTER:{x:0,y:0}
  };
  return map[direction] ?? {x:0,y:0};
}
