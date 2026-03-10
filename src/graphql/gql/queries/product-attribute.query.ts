import { gql } from '@apollo/client';

import { METADATA_FRAGMENT, PRODUCT_ATTRIBUTE_FRAGMENT } from '@/graphql/gql/fragments';

export const PRODUCT_ATTRIBUTE = gql`
  query ProductAttribute($query: GetOneInput) {
    productAttribute(query: $query) {
      ...ProductAttributeFields
      id
    }
  }
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
`;

export const PRODUCT_ATTRIBUTES = gql`
  query ProductAttributes($query: GetManyInput) {
    productAttributes(query: $query) {
      data {
        ...ProductAttributeFields
        id
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
  ${METADATA_FRAGMENT}
`;
