import { gql } from '@apollo/client';

import { METADATA_FRAGMENT, PERMISSION_FRAGMENT } from '@/graphql/gql/fragments';

export const PERMISSION = gql`
  query Permission($query: GetOneInput) {
    permission(query: $query) {
      ...PermissionFields
      id
    }
  }
  ${PERMISSION_FRAGMENT}
`;

export const PERMISSIONS = gql`
  query Permissions($query: GetManyInput) {
    permissions(query: $query) {
      data {
        ...PermissionFields
        id
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${PERMISSION_FRAGMENT}
  ${METADATA_FRAGMENT}
`;
