"use client";
import type { HouseConfig, RoomType } from "@/types/house";

const labels: Record<RoomType,string> = { living:"Phòng khách", bedroom:"Phòng ngủ", kitchen:"Bếp", wc:"WC", altar:"Phòng thờ", stairs:"Cầu thang", dining:"Phòng ăn", office:"Phòng làm việc", garage:"Gara", yard:"Sân" };
const defaults: Record<RoomType,number> = { living:1, bedroom:3, kitchen:1, wc:2, altar:1, stairs:1, dining:0, office:0, garage:0, yard:1 };

export function Controls({ config, setConfig, onGenerate }: { config: HouseConfig; setConfig:(v:HouseConfig)=>void; onGenerate:()=>void }) {
  const update = (patch: Partial<HouseConfig>) => setConfig({...config, ...patch});
  const setRoom = (type: RoomType, quantity: number) => setConfig({...config, rooms: config.rooms.map(r=>r.type===type ? {...r, quantity:Math.max(0,Math.min(9,quantity))} : r)});
  const ensureRooms = () => setConfig({...config, rooms:(Object.keys(labels) as RoomType[]).map(t=>({type:t,quantity:defaults[t]}))});
  return <div className="panel">
    <h2>THÔNG SỐ NHÀ</h2>
    <div className="two">
      <div className="field"><label>Rộng (mm)</label><input type="number" value={config.widthMm} onChange={e=>update({widthMm:+e.target.value})}/></div>
      <div className="field"><label>Dài (mm)</label><input type="number" value={config.depthMm} onChange={e=>update({depthMm:+e.target.value})}/></div>
    </div>
    <div className="two">
      <div className="field"><label>Bắc (độ)</label><input type="number" value={config.northAngleDeg} onChange={e=>update({northAngleDeg:+e.target.value})}/></div>
      <div className="field"><label>Năm xem</label><input type="number" value={config.year} onChange={e=>update({year:+e.target.value})}/></div>
    </div>
    <div className="field"><label>Hướng/cửa chính</label><select value={config.entranceDirection} onChange={e=>update({entranceDirection:e.target.value})}>{["Bắc","Đông Bắc","Đông","Đông Nam","Nam","Tây Nam","Tây","Tây Bắc"].map(x=><option key={x}>{x}</option>)}</select></div>

    <div className="section">
      <h2>CÔNG NĂNG / SỐ LƯỢNG</h2>
      {(Object.keys(labels) as RoomType[]).map(type=><div className="room-row" key={type}><label>{labels[type]}</label><input type="number" min={0} max={9} value={config.rooms.find(r=>r.type===type)?.quantity ?? 0} onChange={e=>setRoom(type,+e.target.value)}/></div>)}
      <button className="btn small" onClick={ensureRooms}>Khôi phục mẫu 5×16</button>
    </div>

    <div className="section">
      <div className="actions"><button className="btn primary" onClick={onGenerate}>TẠO / CẬP NHẬT BẢN VẼ</button></div>
      <div className="footer-note">Engine hiện tại là bản nền: layout tham số hóa, SVG vector, chống chồng phòng cơ bản và overlay Cửu Cung. Công thức phi tinh theo trường phái cụ thể phải được thay vào module fengshui/nine-palace.ts.</div>
    </div>
  </div>;
}
