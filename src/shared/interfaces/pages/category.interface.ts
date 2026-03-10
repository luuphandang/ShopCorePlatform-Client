import { IAbstractSearchParams } from './abstract.interface';

export interface ICategoryPageParams {
  slug?: string | null;
}

export interface ICategoryPageSearchParams extends IAbstractSearchParams {
  keyword?: string | null;
  status?: string | null;
}
