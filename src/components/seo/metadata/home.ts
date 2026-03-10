import { Metadata } from 'next';

import { GOOGLE_VERIFY_TOKEN, WEBSITE_URL } from '@/shared/constants/application';
import { BUSINESS_NAME } from '@/shared/constants/business';
import { SEO_DESCRIPTION, SEO_KEYWORDS } from '@/shared/constants/seo';

export function generateHomeMetadata(): Metadata {
  const title = `${BUSINESS_NAME} - Dịch Vụ Photocopy & Sản Phẩm Handmade theo yêu cầu`;

  return {
    title,
    description: SEO_DESCRIPTION,
    keywords: SEO_KEYWORDS,
    verification: {
      google: GOOGLE_VERIFY_TOKEN,
    },
    metadataBase: new URL(WEBSITE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description: SEO_DESCRIPTION,
      url: WEBSITE_URL,
      siteName: BUSINESS_NAME,
      images: [
        {
          url: `${WEBSITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@photocopy99',
      title,
      description: SEO_DESCRIPTION,
      images: [`${WEBSITE_URL}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
