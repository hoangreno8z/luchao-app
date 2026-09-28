import type { Point, Rect } from "@/types/house";

export function areaM2(r: Rect): number {
  return (r.width * r.height) / 1_000_000;
}

export function centerOfRect(r: Rect): Point {
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
}

export function overlaps(a: Rect, b: Rect, gap = 0): boolean {
  return !(
    a.x + a.width + gap <= b.x ||
    b.x + b.width + gap <= a.x ||
    a.y + a.height + gap <= b.y ||
    b.y + b.height + gap <= a.y
  );
}

export function inside(a: Rect, boundary: Rect, margin = 0): boolean {
  return a.x >= boundary.x + margin && a.y >= boundary.y + margin &&
    a.x + a.width <= boundary.x + boundary.width - margin &&
    a.y + a.height <= boundary.y + boundary.height - margin;
}

export function rotatePoint(p: Point, center: Point, deg: number): Point {
  const r = (deg * Math.PI) / 180;
  const cos = Math.cos(r), sin = Math.sin(r);
  const x = p.x - center.x, y = p.y - center.y;
  return { x: center.x + x * cos - y * sin, y: center.y + x * sin + y * cos };
}
