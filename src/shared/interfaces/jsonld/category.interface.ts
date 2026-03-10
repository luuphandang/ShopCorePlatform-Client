import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IContextJsonld } from './abstract.interface';

export interface ICategoryJsonld extends IContextJsonld {
  '@type': EJsonldType.COLLECTION_PAGE;
  serviceType: string;
}
