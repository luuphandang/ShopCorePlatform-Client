import { Metadata } from 'next';

import { TCategoriesQuery, TCategoryQuery, TProductQuery, TProductsQuery } from '@/graphql/@types';
import {
  BUSINESS_NAME,
  GOOGLE_VERIFY_TOKEN,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  WEBSITE_URL,
} from '@/shared/constants';
import { EMetadataType } from '@/shared/enums';

import { generateAboutMetadata } from './about';
import { generateCategoryMetadata } from './category';
import { generateContactMetadata } from './contact';
import { generateHomeMetadata } from './home';
import { generateProductLandingMetadata, generateProductMetadata } from './product';
import { generateServiceLandingMetadata, generateServiceMetadata } from './service';
interface IMetadataProps {
  type: EMetadataType;
  data?: TProductQuery | TProductsQuery | TCategoryQuery | TCategoriesQuery;
}

export default function generateMetadataFactory({ type, data }: IMetadataProps): Metadata {
  switch (type) {
    case EMetadataType.HOME:
      return generateHomeMetadata();
    case EMetadataType.SERVICE_LANDING:
      return generateServiceLandingMetadata(data as TCategoriesQuery);
    case EMetadataType.SERVICE:
      return generateServiceMetadata(data as TProductQuery);
    case EMetadataType.PRODUCT_LANDING:
      return generateProductLandingMetadata(data as TCategoriesQuery);
    case EMetadataType.PRODUCT:
      return generateProductMetadata(data as TProductQuery);
    case EMetadataType.CATEGORY:
      return generateCategoryMetadata(data as TCategoryQuery);
    case EMetadataType.CONTACT:
      return generateContactMetadata();
    case EMetadataType.ABOUT:
      return generateAboutMetadata();
    default:
      return {
        title: `${BUSINESS_NAME} - Dịch Vụ Photocopy & Sản Phẩm Handmade theo yêu cầu`,
        description: SEO_DESCRIPTION,
        keywords: SEO_KEYWORDS,
        verification: {
          google: GOOGLE_VERIFY_TOKEN,
        },
        metadataBase: new URL(WEBSITE_URL),
      };
  }
}
