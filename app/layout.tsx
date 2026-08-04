import type { Metadata } from 'next';
import NavigationHeader from '@/components/common/NavigationHeader';
import Footer from '@/components/common/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kinh Dịch - Thái Ất Thần Số | Cổng Dịch Học Hợp Nhất',
  description: 'Gieo Quẻ Kinh Dịch Lục Hào & Thái Ất Thần Số tự động - Dịch Sư Nguyễn Huy Hoàng - Zalo 0933116860',
  openGraph: {
    title: 'Kinh Dịch - Thái Ất Thần Số | Cổng Dịch Học Hợp Nhất',
    description: 'Gieo Quẻ Kinh Dịch Lục Hào & Thái Ất Thần Số tự động - Dịch Sư Nguyễn Huy Hoàng - Zalo 0933116860',
    url: 'https://luchao-app.vercel.app/',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-[#0f0a05] text-[#f5ece1] font-sans antialiased">
        <NavigationHeader />
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
