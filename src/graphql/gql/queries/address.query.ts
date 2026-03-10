import { gql } from '@apollo/client';

import { ADDRESS_FRAGMENT, METADATA_FRAGMENT, USER_FRAGMENT } from '@/graphql/gql/fragments';

export const ADDRESS = gql`
  query Address($query: GetOneInput) {
    address(query: $query) {
      ...AddressFields
      id
      code
      ward
      district
      province
      country
      postal_code
      latitude
      longitude
      creator {
        ...UserFields
      }
      updated_at
      updater {
        ...UserFields
      }
    }
  }
  ${ADDRESS_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const ADDRESSES = gql`
  query Addresses($query: GetManyInput) {
    addresses(query: $query) {
      data {
        ...AddressFields
        id
        code
        ward
        district
        province
        country
        creator {
          ...UserFields
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${ADDRESS_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
