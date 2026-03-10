import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IContextJsonld } from './abstract.interface';

export interface IServiceJsonld extends IContextJsonld {
  '@type': EJsonldType.SERVICE;
  description: string;
  serviceType: string;
}
