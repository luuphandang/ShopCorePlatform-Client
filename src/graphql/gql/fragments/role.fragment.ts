import { gql } from '@apollo/client';

export const ROLE_FRAGMENT = gql`
  fragment RoleFields on Role {
    name
    created_at
  }
`;
