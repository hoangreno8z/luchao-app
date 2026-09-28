"use client";
import React, { forwardRef } from "react";
import type { FengShuiResult, HouseGeometry } from "@/types/house";

interface Props { geometry: HouseGeometry; feng?: FengShuiResult; overlay: boolean; }

const FloorPlanSvg = forwardRef<SVGSVGElement, Props>(function FloorPlanSvg({ geometry, feng, overlay }, ref) {
  const W=geometry.widthMm, D=geometry.depthMm;
  const pad=700;
  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width={W+pad*2} height={D+pad*2} viewBox={`${-pad} ${-pad} ${W+pad*2} ${D+pad*2}`} role="img">
      <rect x={-pad} y={-pad} width={W+pad*2} height={D+pad*2} fill="#fff" />
      <g fontFamily="Arial, sans-serif">
        <text x={0} y={-350} textAnchor="middle" fontSize={150} fontWeight="800" fill="#152238">MẶT BẰNG TƯ VẤN PHONG THỦY</text>
        <text x={0} y={-150} textAnchor="middle" fontSize={90} fill="#58677d">{(W/1000).toFixed(2)}m × {(D/1000).toFixed(2)}m · Hướng nhà {geometry.northAngleDeg}°</text>

        <rect x={0} y={0} width={W} height={D} fill="#fdfdfd" stroke="#1e293b" strokeWidth={180} />

        {geometry.rooms.map(room => (
          <g key={room.id}>
            <rect x={room.x} y={room.y} width={room.width} height={room.height} fill="#f8fafc" stroke="#6b7280" strokeWidth={80} />
            <text x={room.x+room.width/2} y={room.y+room.height/2-50} textAnchor="middle" fontSize={125} fontWeight="700" fill="#243247">{room.name}</text>
            <text x={room.x+room.width/2} y={room.y+room.height/2+120} textAnchor="middle" fontSize={95} fill="#64748b">{room.areaM2.toFixed(2)} m²</text>
          </g>
        ))}

        {geometry.furniture.map(f => {
          if (f.type === "bed") return <rect key={f.id} x={f.x} y={f.y} width={f.width} height={f.height} fill="#e5e7eb" stroke="#6b7280" strokeWidth={45} rx={40}/>;
          if (f.type === "sofa") return <rect key={f.id} x={f.x} y={f.y} width={f.width} height={f.height} fill="#dbeafe" stroke="#64748b" strokeWidth={45} rx={90}/>;
          if (f.type === "counter") return <rect key={f.id} x={f.x} y={f.y} width={f.width} height={f.height} fill="#f1f5f9" stroke="#475569" strokeWidth={45}/>;
          if (f.type === "altar") return <g key={f.id}><rect x={f.x} y={f.y} width={f.width} height={f.height} fill="#fef3c7" stroke="#92400e" strokeWidth={45}/><text x={f.x+f.width/2} y={f.y+f.height/2+30} textAnchor="middle" fontSize={90}>BAN THỜ</text></g>;
          if (f.type === "stairs") return <g key={f.id}>{Array.from({length:8}).map((_,i)=><line key={i} x1={f.x} x2={f.x+f.width} y1={f.y+i*f.height/8} y2={f.y+i*f.height/8} stroke="#64748b" strokeWidth={30}/>)}</g>;
          if (f.type === "wc") return <circle key={f.id} cx={f.x+f.width/2} cy={f.y+f.height/2} r={f.width*0.32} fill="none" stroke="#64748b" strokeWidth={35}/>;
          return null;
        })}

        {geometry.doors.map(d => <g key={d.id}><rect x={d.x-d.width/2} y={d.y-70} width={d.width} height={140} fill="#fff"/><path d={`M ${d.x-d.width/2} ${d.y} A ${d.width} ${d.width} 0 0 1 ${d.x+d.width/2} ${d.y-d.width}`} fill="none" stroke="#7c3aed" strokeWidth={28}/></g>)}
        {geometry.windows.map(w => <rect key={w.id} x={w.x-w.width/2} y={w.y-60} width={w.width} height={120} fill="#dbeafe" stroke="#0284c7" strokeWidth={35}/>) }

        {/* dimensions */}
        <line x1={0} y1={D+350} x2={W} y2={D+350} stroke="#334155" strokeWidth={20}/>
        <line x1={0} y1={D+280} x2={0} y2={D+420} stroke="#334155" strokeWidth={20}/>
        <line x1={W} y1={D+280} x2={W} y2={D+420} stroke="#334155" strokeWidth={20}/>
        <text x={W/2} y={D+520} textAnchor="middle" fontSize={100} fill="#334155">{W} mm</text>
        <line x1={W+350} y1={0} x2={W+350} y2={D} stroke="#334155" strokeWidth={20}/>
        <line x1={W+280} y1={0} x2={W+420} y2={0} stroke="#334155" strokeWidth={20}/>
        <line x1={W+280} y1={D} x2={W+420} y2={D} stroke="#334155" strokeWidth={20}/>
        <text x={W+520} y={D/2} textAnchor="middle" fontSize={100} fill="#334155" transform={`rotate(90 ${W+520} ${D/2})`}>{D} mm</text>

        {/* compass */}
        <g transform={`translate(${W-450} ${-250}) rotate(${geometry.northAngleDeg})`}>
          <circle cx={0} cy={0} r={170} fill="#fff" stroke="#111827" strokeWidth={30}/>
          <path d="M 0 -145 L 42 95 L 0 45 L -42 95 Z" fill="#111827"/>
          <text x={0} y={-195} textAnchor="middle" fontSize={105} fontWeight="900">BẮC</text>
        </g>

        {overlay && feng && <g>
          {feng.palaces.map(p => (
            <g key={p.id}>
              <rect x={p.rect.x} y={p.rect.y} width={p.rect.width} height={p.rect.height} fill="#f59e0b" opacity={0.12} stroke="#b45309" strokeWidth={35} />
              <text x={p.rect.x+p.rect.width/2} y={p.rect.y+220} textAnchor="middle" fontSize={120} fontWeight="900" fill="#9a3412">{p.direction}</text>
              <circle cx={p.rect.x+p.rect.width/2} cy={p.rect.y+p.rect.height/2} r={180} fill="#fff7ed" stroke="#c2410c" strokeWidth={30}/>
              <text x={p.rect.x+p.rect.width/2} y={p.rect.y+p.rect.height/2+45} textAnchor="middle" fontSize={170} fontWeight="900" fill="#9a3412">{p.annualNumber}</text>
            </g>
          ))}
          <text x={W/2} y={D/2+35} textAnchor="middle" fontSize={110} fontWeight="900" fill="#7c2d12">CỬU CUNG · {feng.year}</text>
        </g>}
      </g>
    </svg>
  );
});
export default FloorPlanSvg;
