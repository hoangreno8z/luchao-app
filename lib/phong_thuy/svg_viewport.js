// ============================================================
// 4. SVG VIEWPORT CONTROLLER (lib/phong_thuy/svg_viewport.js)
// Quản lý Pan, Zoom, Pinch-to-zoom và Auto Fit-to-screen chuẩn 2.4
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export class SvgViewportController {
    constructor(containerElement) {
        this.container = containerElement;
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.svgElement = null;

        this.initEvents();
        this.initResizeListener();
    }

    setSvgContent(svgString) {
        if (!this.container) return;
        this.container.innerHTML = svgString;
        this.svgElement = this.container.querySelector('svg');
        if (this.svgElement) {
            this.fitToScreen();
        }
    }

    initEvents() {
        if (!this.container) return;

        // Pointer Events API (Dùng chung cho cả Chuột và Cảm ứng Touch)
        this.container.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            this.isDragging = true;
            this.startX = e.clientX - this.panX;
            this.startY = e.clientY - this.panY;
            this.container.style.cursor = 'grabbing';
            this.container.setPointerCapture(e.pointerId);
        });

        this.container.addEventListener('pointermove', (e) => {
            if (!this.isDragging) return;
            this.panX = e.clientX - this.startX;
            this.panY = e.clientY - this.startY;
            requestAnimationFrame(() => this.updateTransform());
        });

        const stopDrag = (e) => {
            if (this.isDragging) {
                this.isDragging = false;
                if (this.container) {
                    this.container.style.cursor = 'grab';
                    try { this.container.releasePointerCapture(e.pointerId); } catch (_) {}
                }
            }
        };

        this.container.addEventListener('pointerup', stopDrag);
        this.container.addEventListener('pointercancel', stopDrag);

        // Mouse Wheel Zoom
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1.15 : 0.85;
            this.zoomAt(delta, e.clientX, e.clientY);
        }, { passive: false });

        // Touch Pinch-to-zoom (Hai ngón tay)
        let initialDistance = 0;
        let initialScale = 1.0;

        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                this.isDragging = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                initialDistance = Math.hypot(dx, dy);
                initialScale = this.scale;
            }
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialDistance > 0) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.hypot(dx, dy);
                const factor = dist / initialDistance;
                this.scale = Math.max(0.3, Math.min(6.0, initialScale * factor));
                requestAnimationFrame(() => this.updateTransform());
            }
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            initialDistance = 0;
        });
    }

    initResizeListener() {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => this.fitToScreen());
        });
    }

    zoomAt(factor, clientX, clientY) {
        this.scale = Math.max(0.3, Math.min(6.0, this.scale * factor));
        this.updateTransform();
    }

    zoomIn() {
        this.scale = Math.min(6.0, this.scale * 1.25);
        this.updateTransform();
    }

    zoomOut() {
        this.scale = Math.max(0.3, this.scale * 0.8);
        this.updateTransform();
    }

    fitToScreen() {
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
    }

    updateTransform() {
        if (!this.svgElement) return;
        this.svgElement.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
    }

    exportSvg(fileName = 'Mat_Bang_Kien_Truc.svg') {
        if (!this.svgElement) return;
        const svgData = new XMLSerializer().serializeToString(this.svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportPng(fileName = 'Mat_Bang_Kien_Truc.png', scaleFactor = 3) {
        if (!this.svgElement) return;
        const svgData = new XMLSerializer().serializeToString(this.svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const rect = this.svgElement.viewBox.baseVal || { width: 1200, height: 800 };
            const width = (rect.width || 1200) * (scaleFactor / 4);
            const height = (rect.height || 800) * (scaleFactor / 4);

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }
}
