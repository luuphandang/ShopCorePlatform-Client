import { OrderQuery } from './graphql.type';

export type TOrderHistoriesQuery = NonNullable<NonNullable<OrderQuery['order']>>['histories'];
