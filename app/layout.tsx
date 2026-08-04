import type { Metadata, Viewport } from 'next';
import NavigationHeader from '@/components/common/NavigationHeader';
import Footer from '@/components/common/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://luchao-app.vercel.app'),
  title: {
    default: 'Kinh Dịch Lục Hào & Thái Ất Thần Số | Dịch Sư Nguyễn Huy Hoàng',
    template: '%s | Dịch Sư Nguyễn Huy Hoàng',
  },
  description: 'Hệ thống luận giải Kinh Dịch Lục Hào & Thái Ất Thần Số tự động chính xác theo Nạp Giáp, Ngũ Hành, Thần Sát. Dịch Sư Nguyễn Huy Hoàng - Zalo: 0933116860.',
  keywords: [
    'Kinh Dịch',
    'Lục Hào',
    'Thái Ất Thần Số',
    'Gieo quẻ 3 đồng xu',
    'Nguyễn Huy Hoàng',
    'Luận giải quẻ dịch',
    'Lập quẻ tự động',
  ],
  authors: [{ name: 'Nguyễn Huy Hoàng' }],
  creator: 'Nguyễn Huy Hoàng',
  publisher: 'Dịch Học Hợp Nhất',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kinh Dịch Lục Hào & Thái Ất Thần Số | Dịch Sư Nguyễn Huy Hoàng',
    description: 'Hệ thống luận giải Kinh Dịch Lục Hào & Thái Ất Thần Số tự động chính xác theo Nạp Giáp, Ngũ Hành, Thần Sát. Zalo: 0933116860.',
    url: 'https://luchao-app.vercel.app/',
    siteName: 'Kinh Dịch - Thái Ất Thần Số',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/og_share_v2.png',
        width: 1200,
        height: 630,
        alt: 'Kinh Dịch Lục Hào - Dịch Sư Nguyễn Huy Hoàng',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinh Dịch Lục Hào & Thái Ất Thần Số | Dịch Sư Nguyễn Huy Hoàng',
    description: 'Hệ thống luận giải Kinh Dịch Lục Hào & Thái Ất Thần Số tự động chính xác.',
    images: ['/og_share_v2.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/og_share_v2.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0a05',
  width: 'device-width',
  initialScale: 1,
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
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6" id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
