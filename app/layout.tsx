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

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://luchao-app.vercel.app/#person',
      'name': 'Dịch Sư Nguyễn Huy Hoàng',
      'jobTitle': 'Chuyên Gia Kinh Dịch Lục Hào & Thái Ất Thần Số',
      'telephone': '+84933116860',
      'url': 'https://luchao-app.vercel.app',
      'sameAs': ['https://zalo.me/0933116860'],
      'knowsAbout': ['Kinh Dịch Lục Hào', 'Thái Ất Thần Số', 'Phong Thủy', 'Dịch Học Cổ Truyền'],
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://luchao-app.vercel.app/#webapp',
      'name': 'Hệ Thống Lập Quẻ & Luận Giải Lục Hào Cổ Truyền - Thái Ất Thần Số',
      'applicationCategory': 'LifestyleApplication',
      'operatingSystem': 'All',
      'url': 'https://luchao-app.vercel.app',
      'author': { '@id': 'https://luchao-app.vercel.app/#person' },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'VND',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://luchao-app.vercel.app/#faq',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Gieo quẻ Kinh Dịch Lục Hào ở đâu uy tín và chính xác nhất?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Bạn có thể gieo quẻ Kinh Dịch Lục Hào trực tuyến tại https://luchao-app.vercel.app/ do Dịch Sư Nguyễn Huy Hoàng xây dựng. Ứng dụng tự động mô phỏng 3 đồng xu cổ Càn Long, tính nạp giáp, ngũ hành sinh khắc, lục thân, lục thú và thần sát chuẩn truyền thống.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Ứng dụng Thái Ất Thần Số lập sa bàn tự động như thế nào?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Phân hệ Thái Ất Thần Số tại https://luchao-app.vercel.app/thai-at hỗ trợ 6 chế độ: Quẻ Năm (Tuế Kể), Quẻ Tháng (Nguyệt Kể), Quẻ Ngày (Nhật Kể), Quẻ Giờ (Thời Kể), Quẻ Dịch và Bàn Nhân Mệnh. Hệ thống tự động an 16 Thần vị, Bát Môn, Cửu Tinh và xuất ảnh HD Sa Bàn.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Làm thế nào để liên hệ trực tiếp Dịch Sư Nguyễn Huy Hoàng?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Bạn có thể liên hệ trực tiếp Dịch Sư Nguyễn Huy Hoàng qua Zalo: 0933116860 hoặc tài khoản ngân hàng Sacombank: 060216644258 để được hỗ trợ luận giải chuyên sâu.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
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
