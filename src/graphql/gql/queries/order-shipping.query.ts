import { gql } from '@apollo/client';

import { METADATA_FRAGMENT, ORDER_SHIPPING_FRAGMENT, USER_FRAGMENT } from '@/graphql/gql/fragments';

export const SHIPPING = gql`
  query OrderShipping($query: GetOneInput) {
    shipping(query: $query) {
      ...OrderShippingFields
      id
      code
      creator {
        ...UserFields
      }
      updated_at
      updater {
        ...UserFields
      }
    }
  }
  ${ORDER_SHIPPING_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const SHIPPINGS = gql`
  query OrderShippings($query: GetManyInput) {
    shippings(query: $query) {
      data {
        ...OrderShippingFields
        id
        code
        creator {
          ...UserFields
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${ORDER_SHIPPING_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
