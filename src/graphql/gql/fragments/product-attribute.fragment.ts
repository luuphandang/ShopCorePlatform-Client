import { gql } from '@apollo/client';

export const PRODUCT_ATTRIBUTE_FRAGMENT = gql`
  fragment ProductAttributeFields on ProductAttribute {
    name
    created_at
  }
`;
