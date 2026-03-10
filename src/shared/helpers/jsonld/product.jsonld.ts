import { EProductType, TProductQuery } from '@/graphql/@types';
import { WEBSITE_URL } from '@/shared/constants';
import { EProductTypeUrlMap } from '@/shared/enums';
import { EJsonldType } from '@/shared/enums/jsonld.enum';
import { IProductJsonld } from '@/shared/interfaces/jsonld/product.interface';

export class ProductJsonld {
  private readonly subject: TProductQuery;

  constructor(product: TProductQuery) {
    this.subject = product;
  }

  getJsonld(): IProductJsonld {
    return {
      '@context': 'https://schema.org/',
      '@type': EJsonldType.PRODUCT,
      name: this.subject?.name ?? '',
      url: `${WEBSITE_URL}/${EProductTypeUrlMap[this.subject?.type as EProductType]}/${this.subject?.slug ?? ''}`,
      sku: this.subject?.sku ?? '',
      description: this.subject?.description ?? '',
      productID: this.subject?.id ?? 0,
      category: this.subject?.categories?.[0]?.name ?? '',
      image: [this.subject?.thumbnail?.url ?? ''],
      offers: {
        '@type': EJsonldType.OFFER,
        priceCurrency: 'VND',
        price: '120000',
        availability: 'http://schema.org/InStock',
        url: 'https://example.com/san-pham/hoa-vai',
        hasMerchantReturnPolicy: {
          '@type': EJsonldType.OFFER,
          applicableCountry: 'VN',
          returnPolicyCategory: 'http://schema.org/Returnable',
          merchantReturnDays: 7,
          returnMethod: 'http://schema.org/ReturnByMail',
          returnFees: 'http://schema.org/FreeReturn',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '30000',
            currency: 'VND',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'VN',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'd',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 4,
              unitCode: 'd',
            },
          },
        },
      },
    };
  }
}
