import { EProductType, TProductQuery } from '@/graphql/@types';
import { WEBSITE_URL } from '@/shared/constants';
import { EJsonldType, EProductTypeUrlMap } from '@/shared/enums';
import { IServiceJsonld } from '@/shared/interfaces/jsonld/service.interface';

export class ServiceJsonld {
  private readonly subject: TProductQuery;

  constructor(product: TProductQuery) {
    this.subject = product;
  }

  getJsonld(): IServiceJsonld {
    return {
      '@context': 'https://schema.org/',
      '@type': EJsonldType.SERVICE,
      name: this.subject?.name ?? '',
      url: `${WEBSITE_URL}/${EProductTypeUrlMap[this.subject?.type as EProductType]}/${this.subject?.slug ?? ''}`,
      description: this.subject?.description ?? '',
      serviceType: this.subject?.categories?.[0]?.name ?? '',
    };
  }
}
