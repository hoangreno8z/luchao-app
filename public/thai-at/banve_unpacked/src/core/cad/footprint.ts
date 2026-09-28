import { Point } from "../math/geometry-types";

export type FootprintKind = "RECTANGLE"|"L_SHAPE"|"U_SHAPE"|"STEPPED"|"POLYGON";

export interface Footprint {
  readonly kind: FootprintKind;
  readonly points: readonly Point[];
}

export class FootprintFactory {
  static rectangle(w:number,h:number):Footprint {
    return {kind:"RECTANGLE",points:[
      {x:0,y:0},{x:w,y:0},{x:w,y:h},{x:0,y:h}
    ]};
  }

  static lShape(w:number,h:number,cutW:number,cutH:number):Footprint {
    if(cutW<=0||cutH<=0||cutW>=w||cutH>=h) throw new Error("Invalid L-shape cut.");
    return {kind:"L_SHAPE",points:[
      {x:0,y:0},{x:w,y:0},{x:w,y:h-cutH},{x:cutW,y:h-cutH},
      {x:cutW,y:h},{x:0,y:h}
    ]};
  }

  static uShape(w:number,h:number,arm:number,slotW:number):Footprint {
    if(arm<=0||slotW<=0||slotW>=w-2*arm||arm>=h) throw new Error("Invalid U-shape.");
    return {kind:"U_SHAPE",points:[
      {x:0,y:0},{x:w,y:0},{x:w,y:h},{x:w-arm,y:h},
      {x:w-arm,y:arm},{x:arm,y:arm},{x:arm,y:h},{x:0,y:h}
    ]};
  }
}
