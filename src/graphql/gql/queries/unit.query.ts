import { gql } from '@apollo/client';

import { METADATA_FRAGMENT, UNIT_FRAGMENT, USER_FRAGMENT } from '@/graphql/gql/fragments';

export const UNIT = gql`
  query Unit($query: GetOneInput) {
    unit(query: $query) {
      ...UnitFields
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
  ${UNIT_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const UNITS = gql`
  query Units($query: GetManyInput) {
    units(query: $query) {
      data {
        ...UnitFields
        id
        code
        slug
        creator {
          ...UserFields
        }
        updated_at
        updater {
          ...UserFields
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${UNIT_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
