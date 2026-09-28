import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phong Thủy — Parametric Floorplan",
  description: "Sinh mặt bằng nhà tham số và phủ Cửu Cung trên chính geometry của căn nhà.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
