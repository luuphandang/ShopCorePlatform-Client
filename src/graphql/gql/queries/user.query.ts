import { gql } from '@apollo/client';

import {
  METADATA_FRAGMENT,
  PERMISSION_FRAGMENT,
  ROLE_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const MY_USER = gql`
  query MyUser($query: GetOneInput) {
    myUser(query: $query) {
      ...UserFields
      id
      code
      avatar {
        ...FileUploadFields
        id
        code
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const USER = gql`
  query User($query: GetOneInput) {
    user(query: $query) {
      ...UserFields
      id
      code
      avatar {
        ...FileUploadFields
        id
        code
      }
      roles {
        ...RoleFields
        id
        code
        permissions {
          ...PermissionFields
          id
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${ROLE_FRAGMENT}
  ${PERMISSION_FRAGMENT}
`;

export const USERS = gql`
  query Users($query: GetManyInput) {
    users(query: $query) {
      data {
        ...UserFields
        id
        code
        avatar {
          ...FileUploadFields
          id
          code
        }
        roles {
          ...RoleFields
          id
          code
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${USER_FRAGMENT}
  ${METADATA_FRAGMENT}
`;
