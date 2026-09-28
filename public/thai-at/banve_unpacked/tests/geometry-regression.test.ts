import { Compass72 } from "../src/core/fengshui/compass";
import { FootprintFactory } from "../src/core/cad/footprint";
import { TopologyNormalizer } from "../src/core/math/topology-normalizer";
import { GeometryMath } from "../src/core/math/geometry-math";
import { classifyMartinez } from "../src/core/engine/martinez-shape-guard";

describe("CAD/Feng Shui hardening",()=>{
  test("L-shape is a real concave polygon",()=>{
    const f=FootprintFactory.lShape(20,15,7,6);
    const p=TopologyNormalizer.normalize({points:f.points});
    expect(p.points.length).toBe(6);
    expect(GeometryMath.polygonPhysicalArea(p)).toBe(258);
  });

  test("24 mountains / 72 sectors",()=>{
    const c=Compass72.sectorAt(180);
    expect(c.name24).toBe("Ngọ");
    expect(c.index72).toBe(36);
    expect(c.bearingCenter).toBe(180);
  });

  test("Martinez multi polygon is not mistaken for polygon",()=>{
    expect(classifyMartinez([[
      [[0,0],[1,0],[1,1],[0,0]]
    ],[
      [[2,2],[3,2],[3,3],[2,2]]
    ]])).toBe("MULTIPOLYGON");
  });
});
