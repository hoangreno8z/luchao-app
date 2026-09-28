"use client";
import { useMemo, useState } from "react";
import { Controls } from "@/components/Controls";
import { Viewer } from "@/components/Viewer";
import { generateFloorplan } from "@/lib/floorplan";
import { calculateNinePalaces } from "@/fengshui/nine-palace";
import type { HouseConfig } from "@/types/house";

const initial: HouseConfig = {
  widthMm:5000,
  depthMm:16000,
  northAngleDeg:0,
  entranceDirection:"Đông Nam",
  year:new Date().getFullYear(),
  template:"tube",
  rooms:[
    {type:"living",quantity:1},{type:"bedroom",quantity:3},{type:"kitchen",quantity:1},{type:"wc",quantity:2},{type:"altar",quantity:1},{type:"stairs",quantity:1},{type:"dining",quantity:0},{type:"office",quantity:0},{type:"garage",quantity:0},{type:"yard",quantity:1}
  ]
};

export default function Home(){
  const [config,setConfig]=useState(initial);
  const [version,setVersion]=useState(0);
  const geometry=useMemo(()=>generateFloorplan(config),[config,version]);
  const feng=useMemo(()=>calculateNinePalaces(geometry,config.year),[geometry,config.year]);
  return <div className="app">
    <header className="header"><div><div className="brand">NGUYỄN HUY HOÀNG</div><div className="sub">Phong Thủy · Parametric Floorplan Engine</div></div><div className="actions"><button className="btn small" onClick={()=>setVersion(v=>v+1)}>REGENERATE</button></div></header>
    <main className="main"><div className="grid"><Controls config={config} setConfig={setConfig} onGenerate={()=>setVersion(v=>v+1)}/><Viewer geometry={geometry} feng={feng}/></div></main>
  </div>;
}
