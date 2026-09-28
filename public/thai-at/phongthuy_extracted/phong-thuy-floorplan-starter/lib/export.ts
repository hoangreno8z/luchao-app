export function downloadText(filename: string, text: string, mime = "image/svg+xml") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export async function downloadSvgAsPng(filename: string, svgElement: SVGSVGElement, scale = 2) {
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgElement);
  const svgBlob = new Blob([source], { type:"image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  await new Promise<void>((resolve, reject) => { img.onload=()=>resolve(); img.onerror=()=>reject(new Error("SVG render failed")); img.src=url; });
  const box = svgElement.viewBox.baseVal;
  const canvas = document.createElement("canvas"); canvas.width=box.width*scale; canvas.height=box.height*scale;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  canvas.toBlob(blob => { if (!blob) return; const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=filename; a.click(); }, "image/png");
  URL.revokeObjectURL(url);
}
