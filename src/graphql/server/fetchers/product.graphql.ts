import { Product, ProductQuery, ProductsQuery } from '@/graphql/@types/graphql.type';

import { PRODUCT, PRODUCTS } from '../../gql/queries/product.query';
import {
  IGetOneProps,
  IGraphQLServerContext,
  IPaginationProps,
} from '../../interfaces/abstract.interface';
import { AbstractFetcher } from './abstract.fetcher';

export class ProductFetcher extends AbstractFetcher {
  constructor({ apolloServer, authHeaders }: IGraphQLServerContext) {
    super({ apolloServer, authHeaders });
  }

  async getOne({ where }: IGetOneProps<Product>) {
    const { data, errors } = await this.fetch<ProductQuery>(PRODUCT, {
      query: { where: JSON.stringify(where) },
    });

    return { product: data?.product || null, errors };
  }

  async getPagination({ where, pagination, order }: IPaginationProps<Product>) {
    const { data, errors } = await this.fetch<ProductsQuery>(PRODUCTS, {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    });

    return {
      products: data?.products?.data || [],
      metadata: data?.products?.metadata || this.defaultMetadata,
      errors,
    };
  }
}
