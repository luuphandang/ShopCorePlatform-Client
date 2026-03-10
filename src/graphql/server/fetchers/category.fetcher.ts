import { CategoriesQuery, Category, CategoryQuery } from '@/graphql/@types/graphql.type';
import { CATEGORIES, CATEGORY } from '@/graphql/gql/queries/category.query';

import {
  IGetOneProps,
  IGraphQLServerContext,
  IPaginationProps,
} from '../../interfaces/abstract.interface';
import { AbstractFetcher } from './abstract.fetcher';

export class CategoryFetcher extends AbstractFetcher {
  constructor({ apolloServer, authHeaders }: IGraphQLServerContext) {
    super({ apolloServer, authHeaders });
  }

  async getOne({ where }: IGetOneProps<Category>) {
    const { data, errors } = await this.fetch<CategoryQuery>(CATEGORY, {
      query: { where: JSON.stringify(where) },
    });

    return { category: data?.category || null, errors };
  }

  async getPagination({ where, pagination, order }: IPaginationProps<Category>) {
    const { data, errors } = await this.fetch<CategoriesQuery>(CATEGORIES, {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    });

    return {
      categories: data?.categories?.data || [],
      metadata: data?.categories?.metadata || this.defaultMetadata,
      errors,
    };
  }
}
