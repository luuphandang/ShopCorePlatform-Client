import { gql } from '@apollo/client';

import { CATEGORY_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      ...CategoryFields
    }
  }
  ${CATEGORY_FRAGMENT}
`;
