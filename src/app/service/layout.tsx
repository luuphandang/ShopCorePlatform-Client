import { Metadata } from 'next';
import { Fragment } from 'react';

import { WEBSITE_URL } from '@/shared/constants/application';
import { BUSINESS_LANGUAGE, BUSINESS_NAME } from '@/shared/constants/business';

export const metadata: Metadata = {
  title: `Photocopy - ${BUSINESS_NAME}`,
  description: 'Chất lượng cao - Giá rẻ - Nhanh chóng',
  openGraph: {
    title: `Photocopy - ${BUSINESS_NAME}`,
    description: 'Chất lượng cao - Giá rẻ - Nhanh chóng',
    url: WEBSITE_URL,
    siteName: 'Photocopy99',
    images: [
      {
        url: `${WEBSITE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: 'Photocopy99',
      },
    ],
    locale: BUSINESS_LANGUAGE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Sản phẩm handmade - ${BUSINESS_NAME}`,
    description: 'Chất lượng cao - Giá rẻ - Nhanh chóng',
    images: [`${WEBSITE_URL}/logo.png`],
  },
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
