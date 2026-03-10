import { Metadata } from 'next';

import { TCategoryQuery } from '@/graphql/@types';
import { ECategoryType } from '@/graphql/@types/graphql.type';
import { GOOGLE_VERIFY_TOKEN, WEBSITE_URL } from '@/shared/constants/application';
import { BUSINESS_NAME } from '@/shared/constants/business';
import { SEO_KEYWORDS } from '@/shared/constants/seo';

export function generateCategoryMetadata(category: TCategoryQuery): Metadata {
  const categoryTypeUrl = {
    [ECategoryType.Service]: 'service',
    [ECategoryType.Product]: 'handmade',
    [ECategoryType.Blog]: 'blog',
  };

  if (!category) {
    return {
      title: BUSINESS_NAME,
      description: BUSINESS_NAME,
      keywords: [...SEO_KEYWORDS],
      verification: {
        google: GOOGLE_VERIFY_TOKEN,
      },
    };
  }

  const title = `${category.name} - ${BUSINESS_NAME}`;

  return {
    title,
    description: category.description || '',
    keywords: [...(category.keywords || []), ...SEO_KEYWORDS],
    verification: {
      google: GOOGLE_VERIFY_TOKEN,
    },
    openGraph: {
      type: 'website',
      url: `${WEBSITE_URL}/${categoryTypeUrl[category.type]}/category/${category.slug}`,
      title,
      description: category.description || '',
      images: [
        {
          url: `${WEBSITE_URL}/images/dich-vu.jpg`,
          width: 1200,
          height: 630,
          alt: category.name || '',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@photocopy99',
      title,
      description: category.description || '',
      images: [`${WEBSITE_URL}/images/dich-vu.jpg`],
    },
    alternates: {
      canonical: `${WEBSITE_URL}/${categoryTypeUrl[category.type]}/category/${category.slug}`,
      languages: {
        'vi-VN': `${WEBSITE_URL}/${categoryTypeUrl[category.type]}/category/${category.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
