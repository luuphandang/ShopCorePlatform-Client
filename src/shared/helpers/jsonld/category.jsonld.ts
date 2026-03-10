import { ECategoryType, TCategoryQuery } from '@/graphql/@types';
import { WEBSITE_URL } from '@/shared/constants';
import { ECategoryTypeUrlMap, EJsonldType } from '@/shared/enums';
import { ICategoryJsonld } from '@/shared/interfaces/jsonld/category.interface';

export class CategoryJsonld {
  private readonly subject: TCategoryQuery;

  constructor(category: TCategoryQuery) {
    this.subject = category;
  }

  getJsonld(): ICategoryJsonld {
    return {
      '@context': 'https://schema.org/',
      '@type': EJsonldType.COLLECTION_PAGE,
      name: this.subject?.name ?? '',
      url: `${WEBSITE_URL}/${ECategoryTypeUrlMap[this.subject?.type as ECategoryType]}/${this.subject?.slug ?? ''}`,
      serviceType: 'Copy, Print, Handmade',
    };
  }
}
