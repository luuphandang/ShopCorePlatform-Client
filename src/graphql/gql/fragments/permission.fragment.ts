import { gql } from '@apollo/client';

export const PERMISSION_FRAGMENT = gql`
  fragment PermissionFields on Permission {
    label
    value
  }
`;
