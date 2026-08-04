export async function generateThaiAtPNG(
  captureTargetId: string = 'thai-at-chart-capture',
  imgElementId: string = 'thai-at-chart-img',
  downloadBtnId: string = 'btn-download-direct',
  loaderElementId: string = 'chart-img-loader'
): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const captureTarget = document.getElementById(captureTargetId);
  const imgElement = document.getElementById(imgElementId) as HTMLImageElement | null;
  const downloadBtn = document.getElementById(downloadBtnId) as HTMLAnchorElement | null;
  const loaderElement = document.getElementById(loaderElementId);

  if (!captureTarget || !imgElement) return null;

  if (loaderElement) loaderElement.style.display = 'flex';

  try {
    const html2canvasModule = (await import('html2canvas')).default;

    const canvas = await html2canvasModule(captureTarget, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#050711',
      logging: false,
      windowWidth: 1250,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const cap = clonedDoc.getElementById(captureTargetId);
        if (!cap) return;

        cap.style.width = '1200px';
        cap.style.padding = '24px';
        cap.style.boxSizing = 'border-box';
        cap.style.backgroundColor = '#050711';
        cap.style.borderRadius = '16px';
        cap.style.border = '2px solid rgba(212, 175, 55, 0.4)';
        cap.style.overflow = 'visible';

        const grid = clonedDoc.querySelector('.matrix-grid') as HTMLElement | null;
        if (grid && grid.style.display !== 'none') {
          grid.style.display = 'flex';
          grid.style.flexDirection = 'column';
          grid.style.gap = '5px';

          const cells = Array.from(grid.children) as HTMLElement[];
          const cellMap: Record<string, HTMLElement> = {};
          let trungCungEl: HTMLElement | null = null;

          cells.forEach((c) => {
            if (c.classList.contains('trung-cung-block')) {
              trungCungEl = c;
            } else if (c.id) {
              const id = c.id.replace('cell-', '');
              cellMap[id] = c;
            }
          });

          grid.innerHTML = '';

          const ROW_DEFS = [
            ['ton', 'ty_chi', 'ngo', 'mui', 'khon'],
            ['thin', '__TC__', '__TC__', '__TC__', 'than'],
            ['mao', '__TC__', '__TC__', '__TC__', 'dau'],
            ['dan', '__TC__', '__TC__', '__TC__', 'tuat'],
            ['can', 'suu', 'ty', 'hoi', 'kien'],
          ];

          const row1 = clonedDoc.createElement('div');
          row1.style.display = 'flex';
          row1.style.gap = '5px';
          row1.style.width = '100%';
          ROW_DEFS[0].forEach((id) => {
            if (cellMap[id]) {
              cellMap[id].style.flex = '1';
              row1.appendChild(cellMap[id]);
            }
          });

          const middleBlock = clonedDoc.createElement('div');
          middleBlock.style.display = 'flex';
          middleBlock.style.gap = '5px';
          middleBlock.style.width = '100%';

          const leftCol = clonedDoc.createElement('div');
          leftCol.style.flex = '1';
          leftCol.style.display = 'flex';
          leftCol.style.flexDirection = 'column';
          leftCol.style.gap = '5px';
          ['thin', 'mao', 'dan'].forEach((id) => {
            if (cellMap[id]) {
              cellMap[id].style.flex = '1';
              leftCol.appendChild(cellMap[id]);
            }
          });

          const rightCol = clonedDoc.createElement('div');
          rightCol.style.flex = '1';
          rightCol.style.display = 'flex';
          rightCol.style.flexDirection = 'column';
          rightCol.style.gap = '5px';
          ['than', 'dau', 'tuat'].forEach((id) => {
            if (cellMap[id]) {
              cellMap[id].style.flex = '1';
              rightCol.appendChild(cellMap[id]);
            }
          });

          middleBlock.appendChild(leftCol);
          if (trungCungEl) {
            (trungCungEl as HTMLElement).style.flex = '3';
            (trungCungEl as HTMLElement).style.minHeight = 'auto';
            middleBlock.appendChild(trungCungEl);
          }
          middleBlock.appendChild(rightCol);

          const row5 = clonedDoc.createElement('div');
          row5.style.display = 'flex';
          row5.style.gap = '5px';
          row5.style.width = '100%';
          ROW_DEFS[4].forEach((id) => {
            if (cellMap[id]) {
              cellMap[id].style.flex = '1';
              row5.appendChild(cellMap[id]);
            }
          });

          grid.appendChild(row1);
          grid.appendChild(middleBlock);
          grid.appendChild(row5);
        }
      },
    });

    const imgDataUrl = canvas.toDataURL('image/png');
    imgElement.src = imgDataUrl;
    imgElement.style.display = 'block';

    if (downloadBtn) {
      downloadBtn.href = imgDataUrl;
      downloadBtn.style.display = 'inline-flex';
    }

    if (loaderElement) loaderElement.style.display = 'none';
    return imgDataUrl;
  } catch (err) {
    console.error('Lỗi khi xuất ảnh HD Sa Bàn Thái Ất:', err);
    if (loaderElement) loaderElement.style.display = 'none';
    return null;
  }
}
