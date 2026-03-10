import { gql } from '@apollo/client';

export const UNIT_FRAGMENT = gql`
  fragment UnitFields on Unit {
    name
    created_at
  }
`;
