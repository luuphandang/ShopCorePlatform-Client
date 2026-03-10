import { gql } from '@apollo/client';

import { CONVERSION_UNIT_FRAGMENT, UNIT_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_CONVERSION_UNIT = gql`
  mutation CreateConversionUnit($data: CreateConversionUnitInput!) {
    createConversionUnit(data: $data) {
      ...ConversionUnitFields
      unit {
        ...UnitFields
        id
      }
    }
  }
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
`;

export const UPDATE_CONVERSION_UNIT = gql`
  mutation UpdateConversionUnit($id: Int!, $data: UpdateConversionUnitInput!) {
    updateConversionUnit(id: $id, data: $data) {
      ...ConversionUnitFields
      unit {
        ...UnitFields
        id
      }
    }
  }
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
`;
