import { gql } from '@apollo/client';

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFields on ProductVariant {
    code
    name
    sku
    created_at
  }
`;
