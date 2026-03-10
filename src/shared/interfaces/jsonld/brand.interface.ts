import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IAbstractJsonld } from './abstract.interface';

export interface IBrandJsonld extends IAbstractJsonld {
  '@type': EJsonldType.BRAND;
  name: string;
  url: string;
}
