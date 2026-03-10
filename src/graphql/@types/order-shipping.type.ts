import { OrderQuery } from './graphql.type';

export type TOrderShippingQuery = NonNullable<
  NonNullable<NonNullable<NonNullable<OrderQuery['order']>>['order_details']>[number]
>['shipping'];
