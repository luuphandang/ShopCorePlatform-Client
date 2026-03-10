import { gql } from '@apollo/client';

import { UNIT_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_UNIT = gql`
  mutation CreateUnit($data: CreateUnitInput!) {
    createUnit(data: $data) {
      ...UnitFields
      description
    }
  }
  ${UNIT_FRAGMENT}
`;

export const UPDATE_UNIT = gql`
  mutation UpdateUnit($id: Int!, $data: UpdateUnitInput!) {
    updateUnit(id: $id, data: $data) {
      ...UnitFields
      description
    }
  }
  ${UNIT_FRAGMENT}
`;
