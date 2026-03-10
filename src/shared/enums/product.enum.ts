import { EProductStatus, EProductType } from '@/graphql/@types/graphql.type';

export const EProductTypeUrlMap = {
  [EProductType.Product]: 'handmade',
  [EProductType.Service]: 'service',
};

export const EProductStatusMap = {
  [EProductStatus.Activated]: 'Khả dụng',
  [EProductStatus.Deactivated]: 'Không khả dụng',
};
