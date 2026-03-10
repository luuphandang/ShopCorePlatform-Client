import { Order, OrderQuery, OrdersQuery } from '@/graphql/@types/graphql.type';

import { ORDER, ORDERS } from '../../gql/queries/order.query';
import {
  IGetOneProps,
  IGraphQLServerContext,
  IPaginationProps,
} from '../../interfaces/abstract.interface';
import { AbstractFetcher } from './abstract.fetcher';

export class OrderFetcher extends AbstractFetcher {
  constructor({ apolloServer, authHeaders }: IGraphQLServerContext) {
    super({ apolloServer, authHeaders });
  }

  async getOne({ where }: IGetOneProps<Order>) {
    const { data, errors } = await this.fetch<OrderQuery>(ORDER, {
      query: { where: JSON.stringify(where) },
    });

    return { order: data?.order || null, errors };
  }

  async getPagination({ where, pagination, order }: IPaginationProps<Order>) {
    const { data, errors } = await this.fetch<OrdersQuery>(ORDERS, {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    });

    return {
      orders: data?.orders?.data || [],
      metadata: data?.orders?.metadata || this.defaultMetadata,
      errors,
    };
  }
}
