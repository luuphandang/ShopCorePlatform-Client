import { gql } from '@apollo/client';

export const PRODUCT_ATTRIBUTE_VALUE_FRAGMENT = gql`
  fragment ProductAttributeValueFields on ProductAttributeValue {
    attribute_id
    value
    created_at
  }
`;
