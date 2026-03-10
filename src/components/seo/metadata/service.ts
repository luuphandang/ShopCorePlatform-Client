import { Metadata } from 'next';

import { TCategoriesQuery, TProductQuery } from '@/graphql/@types';
import { GOOGLE_VERIFY_TOKEN, WEBSITE_URL } from '@/shared/constants/application';
import { BUSINESS_NAME } from '@/shared/constants/business';
import { SEO_DESCRIPTION, SEO_KEYWORDS } from '@/shared/constants/seo';

export function generateServiceLandingMetadata(categories: TCategoriesQuery): Metadata {
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

  const title = `Dịch vụ in, ấn - ${BUSINESS_NAME}`;
  return {
    title,
    description: SEO_DESCRIPTION,
    keywords: SEO_KEYWORDS,
    verification: {
      google: GOOGLE_VERIFY_TOKEN,
    },
    alternates: {
      canonical: `/service`,
    },
    openGraph: {
      title,
      description: SEO_DESCRIPTION,
      url: `${WEBSITE_URL}/service`,
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

export function generateServiceMetadata(service: TProductQuery): Metadata {
  if (!service) {
    return {
      title: BUSINESS_NAME,
      description: BUSINESS_NAME,
      keywords: [...SEO_KEYWORDS],
      verification: {
        google: GOOGLE_VERIFY_TOKEN,
      },
    };
  }

  const title = `${service.name} - ${BUSINESS_NAME}`;
  return {
    title,
    description: service.description || '',
    keywords: SEO_KEYWORDS,
    verification: {
      google: GOOGLE_VERIFY_TOKEN,
    },
    openGraph: {
      type: 'website',
      url: `${WEBSITE_URL}/service/${service.slug}`,
      title,
      description: service.description || '',
      images: [
        {
          url: service.thumbnail?.url || '',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@photocopy99',
      title,
      description: service.description || '',
      images: [service.thumbnail?.url || ''],
    },
    alternates: {
      canonical: `${WEBSITE_URL}/service/${service.slug}`,
      languages: {
        'vi-VN': `${WEBSITE_URL}/service/${service.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
