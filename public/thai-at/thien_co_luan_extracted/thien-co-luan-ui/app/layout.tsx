import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thiên Cơ Luân — Nguyễn Huy Hoàng",
  description: "Kinh Dịch • Tử Vi • Bát Tự • Thái Ất",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="vi"><body>{children}</body></html>;
}
