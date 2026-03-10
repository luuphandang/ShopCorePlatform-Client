import { WEBSITE_URL } from '@/shared/constants/application';
import {
  BUSINESS_COUNTRY,
  BUSINESS_FACEBOOK,
  BUSINESS_INSTAGRAM,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PROVINCE,
  BUSINESS_STREET,
  BUSINESS_TIKTOK,
  BUSINESS_ZIP,
} from '@/shared/constants/business';

export interface IHomeJSONLD {
  gtin?: string;
  brand?: string;
  manufacturer?: string;
  category?: string;
  imageUrls?: string[];
  price?: number;
  inStock?: boolean;
  saleStartDate?: Date;
  reviews?: IReviewProduct[];
  rating?: IRatingProduct;
  weight?: number;
  dimensions?: IProductDimension;
  color?: string;
  material?: string;
  relatedProducts?: IProductRelated[];
  warranty?: string;
  returnPolicy?: string;
  description?: string;
}

interface IReviewProduct {
  text?: string;
  date?: Date;
  rating?: number;
  author?: string;
}

interface IRatingProduct {
  value?: number;
  count?: number;
}

interface IProductDimension {
  width?: number;
  height?: number;
  depth?: number;
}

interface IProductRelated {
  name?: string;
  slug?: string;
}

export default function generateHomeJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: BUSINESS_NAME,
        url: WEBSITE_URL,
        logo: `${WEBSITE_URL}/logo.png`,
        description: 'Dịch vụ photocopy, in ấn, scan và sản phẩm handmade chất lượng cao.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS_STREET,
          addressLocality: BUSINESS_PROVINCE,
          addressRegion: BUSINESS_PROVINCE,
          postalCode: BUSINESS_ZIP,
          addressCountry: BUSINESS_COUNTRY,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: BUSINESS_PHONE,
          contactType: 'customer service',
          availableLanguage: ['Vietnamese', 'English'],
        },
        sameAs: [BUSINESS_FACEBOOK, BUSINESS_INSTAGRAM, BUSINESS_TIKTOK],
        foundingDate: '2020-01-01',
      },
      {
        '@type': 'WebSite',
        name: BUSINESS_NAME,
        url: WEBSITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${WEBSITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'LocalBusiness',
        name: BUSINESS_NAME,
        image: `${WEBSITE_URL}/logo.png`,
        telephone: BUSINESS_PHONE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS_STREET,
          addressLocality: BUSINESS_PROVINCE,
          addressRegion: BUSINESS_PROVINCE,
          postalCode: BUSINESS_ZIP,
          addressCountry: BUSINESS_COUNTRY,
        },
        url: WEBSITE_URL,
        priceRange: '$',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '07:00',
            closes: '21:00',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'Photocopy, In Ấn, Scan, Xử Lý Văn Bản & Hình Ảnh',
        provider: {
          '@type': 'LocalBusiness',
          name: BUSINESS_NAME,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: BUSINESS_PROVINCE,
        },
        serviceType: 'Photocopy, In Ấn, Scan, Xử Lý Văn Bản & Hình Ảnh',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${WEBSITE_URL}/service`,
        },
      },
      {
        '@type': 'Product',
        name: 'Sản Phẩm Handmade Độc Đáo',
        image: `${WEBSITE_URL}/san-pham-handmade.jpg`,
        description: 'Các sản phẩm handmade chất lượng cao, làm thủ công tỉ mỉ.',
        brand: {
          '@type': 'Brand',
          name: BUSINESS_NAME,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'VND',
          price: '10000',
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          url: `${WEBSITE_URL}/handmade`,
        },
      },
    ],
  };
}
