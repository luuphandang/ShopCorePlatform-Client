import { gql } from '@apollo/client';

import { METADATA_FRAGMENT, PRODUCT_ATTRIBUTE_VALUE_FRAGMENT } from '@/graphql/gql/fragments';

export const PRODUCT_ATTRIBUTE_VALUE = gql`
  query ProductAttributeValue($query: GetOneInput) {
    productAttributeValue(query: $query) {
      ...ProductAttributeValueFields
      id
    }
  }
  ${PRODUCT_ATTRIBUTE_VALUE_FRAGMENT}
`;

export const PRODUCT_ATTRIBUTE_VALUES = gql`
  query ProductAttributeValues($query: GetManyInput) {
    productAttributeValues(query: $query) {
      data {
        ...ProductAttributeValueFields
        id
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${PRODUCT_ATTRIBUTE_VALUE_FRAGMENT}
  ${METADATA_FRAGMENT}
`;
