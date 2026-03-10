import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Sản phẩm handmade - Photocopy99',
  description: 'Chất lượng cao - Giá rẻ - Nhanh chóng',
  openGraph: {
    title: 'Sản phẩm handmade - Photocopy99',
    description: 'Chất lượng cao - Giá rẻ - Nhanh chóng',
    url: 'https://www.photocopy99.com',
    siteName: 'Photocopy99',
    images: [
      {
        url: 'https://www.photocopy99.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Photocopy99',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sản phẩm handmade | Photocopy99',
    description: 'Chất lượng cao - Giá rẻ - Nhanh chóng',
    images: ['https://www.photocopy99.com/og-image.jpg'],
  },
};

export default function HandmadeLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
