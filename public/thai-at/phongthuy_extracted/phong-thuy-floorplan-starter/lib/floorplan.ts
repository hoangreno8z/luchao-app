import type { Door, Furniture, HouseConfig, HouseGeometry, Room, RoomSpec, Wall, Window } from "@/types/house";
import { areaM2, centerOfRect, inside, overlaps } from "@/lib/geometry";

const NAMES: Record<string, string> = {
  living: "PHÒNG KHÁCH", bedroom: "PHÒNG NGỦ", kitchen: "BẾP", wc: "WC", altar: "PHÒNG THỜ",
  stairs: "CẦU THANG", dining: "PHÒNG ĂN", office: "PHÒNG LÀM VIỆC", garage: "GARA", yard: "SÂN"
};

const MIN: Record<string, { w: number; h: number }> = {
  living: { w: 3200, h: 3800 }, bedroom: { w: 2800, h: 3200 }, kitchen: { w: 2500, h: 3000 },
  wc: { w: 1400, h: 2100 }, altar: { w: 2400, h: 2800 }, stairs: { w: 2200, h: 3000 },
  dining: { w: 2400, h: 2800 }, office: { w: 2400, h: 2800 }, garage: { w: 3000, h: 5000 }, yard: { w: 2500, h: 2500 }
};

function flatten(specs: RoomSpec[]): string[] {
  return specs.flatMap(s => Array.from({ length: Math.max(0, s.quantity) }, () => s.type));
}

function roomSize(type: string, widthMm: number, depthMm: number): { w: number; h: number } {
  const min = MIN[type] ?? { w: 2200, h: 2500 };
  const usableW = Math.max(min.w, Math.min(4500, widthMm - 700));
  const usableH = Math.max(min.h, Math.min(5200, depthMm - 700));
  if (type === "living") return { w: usableW, h: Math.min(usableH, 4500) };
  if (type === "bedroom") return { w: Math.min(3600, usableW), h: Math.min(4000, usableH) };
  return { w: Math.min(3200, usableW), h: Math.min(3600, usableH) };
}

/** Deterministic first-pass layout for rectangular/tube houses. */
export function generateFloorplan(config: HouseConfig): HouseGeometry {
  const W = config.widthMm, D = config.depthMm;
  const margin = Math.min(250, Math.round(Math.min(W, D) * 0.04));
  const corridor = Math.min(1200, Math.max(900, Math.round(W * 0.16)));
  const rooms = flatten(config.rooms);
  const ordered = ["yard", "living", "dining", "kitchen", "bedroom", "bedroom", "bedroom", "office", "altar", "wc", "wc", "stairs", "garage"];
  rooms.sort((a,b) => ordered.indexOf(a) - ordered.indexOf(b));

  const result: Room[] = [];
  let cursorY = margin;
  let rowIndex = 0;

  const preferred: Record<string, "left"|"right"|"center"> = {
    yard: "center", living: "center", dining: "center", kitchen: "right", altar: "center", stairs: "right", wc: "right", garage: "left", office: "left", bedroom: "left"
  };

  for (const type of rooms) {
    const { w, h } = roomSize(type, W, D);
    let x = margin;
    if (preferred[type] === "right") x = W - margin - w;
    if (preferred[type] === "center") x = Math.max(margin, (W - w) / 2);
    if (type === "bedroom" && result.filter(r => r.type === "bedroom").length % 2 === 1) x = W - margin - w;

    if (cursorY + h > D - margin) {
      cursorY = margin;
      rowIndex++;
      x = rowIndex % 2 ? W - margin - w : margin;
    }

    let rect = { x, y: cursorY, width: w, height: h };
    let tries = 0;
    while ((!inside(rect, { x: 0, y: 0, width: W, height: D }, margin) || result.some(r => overlaps(rect, r, 80))) && tries < 30) {
      rect = { x: margin + ((tries * 370) % Math.max(1, W - w - 2 * margin)), y: cursorY + tries * 140, width: w, height: h };
      tries++;
    }
    if (rect.y + rect.height > D - margin) rect = { x: margin, y: Math.max(margin, D - margin - h), width: Math.min(w, W - 2 * margin), height: h };

    const id = `${type}-${result.filter(r => r.type === type).length + 1}`;
    result.push({ id, type: type as Room["type"], name: `${NAMES[type] ?? type.toUpperCase()}${type === "bedroom" ? ` ${result.filter(r => r.type === type).length + 1}` : ""}`, ...rect, areaM2: areaM2(rect), floor: 1 });
    cursorY = rect.y + rect.height + corridor;
  }

  // Ensure at least one living room so an empty input still renders a useful plan.
  if (!result.some(r => r.type === "living")) {
    const r = { x: margin, y: margin, width: W - 2 * margin, height: Math.min(4200, D - 2 * margin) };
    result.push({ id: "living-1", type: "living", name: NAMES.living, ...r, areaM2: areaM2(r), floor: 1 });
  }

  const walls: Wall[] = [];
  const t = 200;
  walls.push(
    { id: "outer-n", a:{x:0,y:0}, b:{x:W,y:0}, thickness:t },
    { id: "outer-e", a:{x:W,y:0}, b:{x:W,y:D}, thickness:t },
    { id: "outer-s", a:{x:W,y:D}, b:{x:0,y:D}, thickness:t },
    { id: "outer-w", a:{x:0,y:D}, b:{x:0,y:0}, thickness:t },
  );
  result.forEach((r, i) => {
    if (i === 0) return;
    walls.push({ id:`room-top-${r.id}`, a:{x:r.x,y:r.y}, b:{x:r.x+r.width,y:r.y}, thickness:120 });
  });

  const doors: Door[] = [{ id:"main-door", x: W/2, y:D, width:1100, rotation:0, type:"double" }];
  const windows: Window[] = [];
  result.forEach((r, i) => {
    windows.push({ id:`window-${i}`, x:r.x+r.width/2, y:r.y, width:Math.min(1400, r.width*0.45), rotation:0 });
  });

  const furniture: Furniture[] = [];
  result.forEach(r => {
    const cx = r.x + r.width/2, cy = r.y + r.height/2;
    if (r.type === "bedroom") furniture.push({ id:`bed-${r.id}`, type:"bed", x:cx-800, y:cy-1000, width:1600, height:2000, label:"GIƯỜNG" });
    if (r.type === "living") furniture.push({ id:`sofa-${r.id}`, type:"sofa", x:cx-1300, y:cy+350, width:2600, height:700, label:"SOFA" });
    if (r.type === "kitchen") furniture.push({ id:`kitchen-${r.id}`, type:"counter", x:r.x+250, y:r.y+250, width:Math.max(1200,r.width-500), height:600, label:"BẾP" });
    if (r.type === "altar") furniture.push({ id:`altar-${r.id}`, type:"altar", x:cx-700, y:r.y+250, width:1400, height:500, label:"BAN THỜ" });
    if (r.type === "stairs") furniture.push({ id:`stairs-${r.id}`, type:"stairs", x:cx-600, y:cy-1100, width:1200, height:2200, label:"THANG" });
    if (r.type === "wc") furniture.push({ id:`wc-${r.id}`, type:"wc", x:cx-450, y:cy-350, width:900, height:700 });
  });

  const center = centerOfRect({x:0,y:0,width:W,height:D});
  return { widthMm:W, depthMm:D, rooms:result, walls, doors, windows, furniture, center, northAngleDeg:config.northAngleDeg };
}
