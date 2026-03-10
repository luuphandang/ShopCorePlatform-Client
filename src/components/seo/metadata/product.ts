import { Metadata } from 'next';

import { TCategoriesQuery, TProductQuery } from '@/graphql/@types';
import { GOOGLE_VERIFY_TOKEN, WEBSITE_URL } from '@/shared/constants/application';
import { BUSINESS_NAME } from '@/shared/constants/business';
import { SEO_DESCRIPTION, SEO_KEYWORDS } from '@/shared/constants/seo';

export function generateProductLandingMetadata(categories: TCategoriesQuery): Metadata {
  if (!Array.isArray(categories)) {
    return {
      title: BUSINESS_NAME,
      description: BUSINESS_NAME,
      keywords: [...SEO_KEYWORDS],
      verification: {
        google: GOOGLE_VERIFY_TOKEN,
      },
    };
  }

  const title = `Sản phẩm handmade - ${BUSINESS_NAME}`;
  return {
    title,
    description: SEO_DESCRIPTION,
    keywords: SEO_KEYWORDS,
    verification: {
      google: GOOGLE_VERIFY_TOKEN,
    },
    alternates: {
      canonical: `/handmade`,
    },
    openGraph: {
      title,
      description: SEO_DESCRIPTION,
      url: `${WEBSITE_URL}/handmade`,
      siteName: BUSINESS_NAME,
      images: [
        {
          url: `${WEBSITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Sản phẩm handmade',
        },
      ],
      type: 'website',
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
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

export function generateProductMetadata(product: TProductQuery): Metadata {
  if (!product) {
    return {
      title: BUSINESS_NAME,
      description: BUSINESS_NAME,
      keywords: [...SEO_KEYWORDS],
      verification: {
        google: GOOGLE_VERIFY_TOKEN,
      },
    };
  }

  const title = `${product.name} - ${BUSINESS_NAME}`;
  return {
    title,
    description: product.description || '',
    keywords: [product.name, ...SEO_KEYWORDS],
    verification: {
      google: GOOGLE_VERIFY_TOKEN,
    },
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title,
      description: product.description || '',
      url: `${WEBSITE_URL}/handmade/${product.slug}`,
      siteName: BUSINESS_NAME,
      images: [
        {
          url: product.thumbnail?.url || '',
          width: 1200,
          height: 630,
          alt: product.name || '',
        },
      ],
      type: 'website',
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: product.description || '',
      images: [product.thumbnail?.url || ''],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
