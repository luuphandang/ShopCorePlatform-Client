import { OrderQuery, OrdersQuery } from './graphql.type';

export type TOrderQuery = OrderQuery['order'];

export type TOrdersQuery = OrdersQuery['orders']['data'];

export type TOrderDetailsQuery = NonNullable<TOrderQuery>['order_details'];

export type TOrderDetailQuery = NonNullable<NonNullable<TOrderQuery>['order_details']>[number];
