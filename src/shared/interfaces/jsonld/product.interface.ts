import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IContextJsonld } from './abstract.interface';
import { IOfferJsonld } from './offer.interface';

export interface IProductJsonld extends IContextJsonld {
  '@type': EJsonldType.PRODUCT;
  sku: string;
  description: string;
  productID: number;
  category: string;
  image: string[];
  offers: IOfferJsonld;
}
