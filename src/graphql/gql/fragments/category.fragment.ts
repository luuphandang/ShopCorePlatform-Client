import { gql } from '@apollo/client';

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    name
    slug
    type
    created_at
  }
`;
