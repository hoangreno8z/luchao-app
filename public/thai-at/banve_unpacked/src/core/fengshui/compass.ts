export interface CompassSector {
  readonly index24: number;
  readonly index72: number;
  readonly bearingStart: number;
  readonly bearingCenter: number;
  readonly bearingEnd: number;
  readonly name24: string;
}

export interface CompassOverlay {
  readonly center: { readonly x:number; readonly y:number };
  readonly rotationDeg: number;
  readonly sectors: readonly CompassSector[];
}

const MOUNTAINS_24 = [
  "Tý","Quý","Sửu","Cấn","Dần","Giáp","Mão","Ất",
  "Thìn","Tốn","Tỵ","Bính","Ngọ","Đinh","Mùi","Khôn",
  "Thân","Canh","Dậu","Tân","Tuất","Càn","Hợi","Nhâm"
] as const;

const norm=(d:number)=>((d%360)+360)%360;

export class Compass72 {
  static sectorAt(bearingDeg:number): CompassSector {
    const b=norm(bearingDeg);
    const i72=Math.floor((b+2.5)/5)%72;
    const i24=Math.floor((b+7.5)/15)%24;
    const center=norm(i72*5);
    return {
      index24:i24,
      index72:i72,
      bearingStart:norm(center-2.5),
      bearingCenter:center,
      bearingEnd:norm(center+2.5),
      name24:MOUNTAINS_24[i24]
    };
  }

  static build(center:{x:number;y:number}, rotationDeg=0): CompassOverlay {
    const sectors:CompassSector[]=[];
    for(let i=0;i<72;i++){
      const c=i*5;
      sectors.push({
        index24:Math.floor((i+1.5)/3)%24,
        index72:i,
        bearingStart:norm(c-2.5),
        bearingCenter:c,
        bearingEnd:norm(c+2.5),
        name24:MOUNTAINS_24[Math.floor((i+1.5)/3)%24]
      });
    }
    return Object.freeze({center,rotationDeg,sectors:Object.freeze(sectors)});
  }

  static bearingFromVector(dx:number,dy:number):number {
    return norm(Math.atan2(dx,dy)*180/Math.PI);
  }
}
