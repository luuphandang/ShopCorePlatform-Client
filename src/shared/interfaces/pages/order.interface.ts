import { IAbstractSearchParams } from './abstract.interface';

export interface IOrderPageParams {
  id?: string | null;
  code?: string | null;
}

export interface IOrderPageSearchParams extends IAbstractSearchParams {
  keyword?: string | null;
  status?: string | null;
  shipping_status?: string | null;
}
