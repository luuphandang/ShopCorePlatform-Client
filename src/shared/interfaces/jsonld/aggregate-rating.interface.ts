import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IAbstractJsonld } from './abstract.interface';

export interface IAggregateRatingJsonld extends IAbstractJsonld {
  '@type': EJsonldType.AGGREGATE_RATING;
  ratingValue: number;
  reviewCount: number;
}
