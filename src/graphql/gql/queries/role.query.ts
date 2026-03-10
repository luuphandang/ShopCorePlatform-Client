import { gql } from '@apollo/client';

import {
  METADATA_FRAGMENT,
  PERMISSION_FRAGMENT,
  ROLE_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const ROLE = gql`
  query Role($query: GetOneInput) {
    role(query: $query) {
      ...RoleFields
      id
      code
      permissions {
        ...PermissionFields
        id
      }
      creator {
        ...UserFields
      }
      updated_at
      updater {
        ...UserFields
      }
    }
  }
  ${ROLE_FRAGMENT}
  ${PERMISSION_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const ROLES = gql`
  query Roles($query: GetManyInput) {
    roles(query: $query) {
      data {
        ...RoleFields
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
      metadata {
        ...MetadataFields
      }
    }
  }
  ${ROLE_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
