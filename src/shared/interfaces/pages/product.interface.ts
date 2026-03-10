import { IAbstractSearchParams } from './abstract.interface';

export interface IProductPageParams {
  slug?: string | null;
}

export interface IProductPageSearchParams extends IAbstractSearchParams {
  keyword?: string | null;
  status?: string | null;
}
