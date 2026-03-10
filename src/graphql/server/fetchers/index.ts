import { ApolloClient } from '@apollo/client';

import { Category, Order, Product } from '../../@types/graphql.type';
import { IAuthProps, IGetOneProps, IPaginationProps } from '../../interfaces/abstract.interface';
import { CategoryFetcher } from './category.fetcher';
import { OrderFetcher } from './order.fetcher';
import { ProductFetcher } from './product.graphql';

interface IGraphQLFetcherProps {
  client: ApolloClient<unknown>;
}

export class GraphQLFetcher {
  static category({ client }: IGraphQLFetcherProps) {
    const categoryFetcher = new CategoryFetcher({
      apolloServer: client,
    });

    return {
      getOne: ({ ...props }: IAuthProps & IGetOneProps<Category>) => categoryFetcher.getOne(props),
      getPagination: ({ ...props }: IAuthProps & IPaginationProps<Category>) =>
        categoryFetcher.getPagination(props),
    };
  }

  static product({ client }: IGraphQLFetcherProps) {
    const productFetcher = new ProductFetcher({
      apolloServer: client,
    });

    return {
      getOne: ({ ...props }: IAuthProps & IGetOneProps<Product>) => productFetcher.getOne(props),
      getPagination: ({ ...props }: IAuthProps & IPaginationProps<Product>) =>
        productFetcher.getPagination(props),
    };
  }

  static order({ client }: IGraphQLFetcherProps) {
    const orderFetcher = new OrderFetcher({
      apolloServer: client,
    });

    return {
      getOne: ({ ...props }: IAuthProps & IGetOneProps<Order>) => orderFetcher.getOne(props),
      getPagination: ({ ...props }: IAuthProps & IPaginationProps<Order>) =>
        orderFetcher.getPagination(props),
    };
  }
}
