import { EJsonldType } from '@/shared/enums/jsonld.enum';

export interface IAbstractJsonld {
  '@type': EJsonldType;
}

export interface IContextJsonld {
  '@context': 'https://schema.org/';
  name: string;
  url: string;
}
