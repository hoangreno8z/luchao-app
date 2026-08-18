// ============================================================
// Đĩa La Kinh 24 Sơn & Lưới Cửu Cung Overlay
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { MOUNTAINS } from '../../lib/phong_thuy/huyen_khong_engine.js';

export class LaKinhRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    /**
     * Vẽ Đĩa La Kinh 24 Sơn Phong Thủy hình tròn
     */
    drawCompassDisc(facingDegree = 180, radius = 180, cx = 200, cy = 200) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(cx, cy);

        // Xoay đĩa theo độ số hướng nhà
        const rotRad = (facingDegree - 180) * Math.PI / 180;
        ctx.rotate(-rotRad);

        // Outer rim
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 24 Mountain Sectors
        const sliceAngle = (Math.PI * 2) / 24;
        const innerRadius = radius * 0.55;

        MOUNTAINS.forEach((m, i) => {
            const angle = (m.center - 90) * Math.PI / 180;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, angle - sliceAngle / 2, angle + sliceAngle / 2);
            ctx.closePath();

            // Background by Yin/Yang
            ctx.fillStyle = (m.yinYang === 1) ? 'rgba(217, 119, 6, 0.15)' : 'rgba(30, 41, 59, 0.4)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Mountain Name Text
            ctx.rotate(angle);
            ctx.fillStyle = (m.yinYang === 1) ? '#fbbf24' : '#e2e8f0';
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(m.name, radius * 0.78, 4);

            // Degrees
            ctx.fillStyle = '#94a3b8';
            ctx.font = '8px Inter, sans-serif';
            ctx.fillText(`${m.center}°`, radius * 0.92, 3);

            ctx.restore();
        });

        // Center Bagua core
        ctx.beginPath();
        ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center Yin Yang Symbol
        this.drawYinYang(ctx, 0, 0, innerRadius * 0.5);

        ctx.restore();
    }

    drawYinYang(ctx, x, y, r) {
        ctx.save();
        ctx.translate(x, y);

        // White half
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
        ctx.fill();

        // Black half
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2, false);
        ctx.fill();

        // Small circles
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -r / 2, r / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(0, r / 2, r / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, -r / 2, r / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, r / 2, r / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
