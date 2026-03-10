import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IAbstractJsonld } from './abstract.interface';

export interface IReviewJsonld extends IAbstractJsonld {
  '@type': EJsonldType.REVIEW;
  datePublished: string;
  author: IReviewAuthorJsonld;
  reviewBody: string;
  name: string;
  reviewRating: IReviewRatingJsonld;
}

export interface IReviewAuthorJsonld {
  '@type': EJsonldType.PERSON;
  name: string;
}

export interface IReviewRatingJsonld {
  '@type': EJsonldType.RATING;
  ratingValue: number;
  bestRating: number;
}
