"use client";
import { useRef, useState } from "react";
import type { FengShuiResult, HouseGeometry } from "@/types/house";
import FloorPlanSvg from "@/components/FloorPlanSvg";
import { downloadSvgAsPng, downloadText } from "@/lib/export";

export function Viewer({ geometry, feng }: { geometry: HouseGeometry; feng:FengShuiResult }) {
  const [mode,setMode]=useState<"arch"|"feng">("arch");
  const [zoom,setZoom]=useState(0.7);
  const ref=useRef<SVGSVGElement>(null);
  const downloadSvg=()=>{ if(!ref.current)return; downloadText(`mat-bang-${mode}.svg`,new XMLSerializer().serializeToString(ref.current)); };
  const downloadPng=async()=>{ if(ref.current) await downloadSvgAsPng(`mat-bang-${mode}.png`,ref.current,2); };
  return <div className="viewer">
    <div className="viewer-tabs"><button className={`tab ${mode==='arch'?'active':''}`} onClick={()=>setMode('arch')}>BẢN VẼ TƯ VẤN</button><button className={`tab ${mode==='feng'?'active':''}`} onClick={()=>setMode('feng')}>CỬU CUNG NĂM {feng.year}</button></div>
    <div className="canvas-shell">
      <div className="canvas-toolbar"><button onClick={()=>setZoom(z=>Math.max(.2,z-.1))}>−</button><button onClick={()=>setZoom(.7)}>FIT</button><button onClick={()=>setZoom(z=>Math.min(2,z+.1))}>+</button><button onClick={downloadSvg}>SVG</button><button onClick={downloadPng}>PNG</button></div>
      <div className="svg-scroll"><div className="svg-stage" style={{transform:`scale(${zoom})`}}><FloorPlanSvg ref={ref} geometry={geometry} feng={feng} overlay={mode==='feng'} /></div></div>
    </div>
    <div className="legend"><span className="badge">Vector SVG</span><span className="badge">Đơn vị mm</span><span className="badge">Zoom / Pan</span><span className="badge">Geometry dùng chung</span></div>
  </div>;
}
