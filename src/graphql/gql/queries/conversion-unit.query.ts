import { gql } from '@apollo/client';

import {
  CONVERSION_UNIT_FRAGMENT,
  METADATA_FRAGMENT,
  UNIT_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const CONVERSION_UNIT = gql`
  query ConversionUnit($query: GetOneInput) {
    conversionUnit(query: $query) {
      ...ConversionUnitFields
      id
      code
      unit {
        ...UnitFields
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
  ${CONVERSION_UNIT_FRAGMENT}
  ${USER_FRAGMENT}
  ${UNIT_FRAGMENT}
`;

export const CONVERSION_UNITS = gql`
  query ConversionUnits($query: GetManyInput) {
    conversionUnits(query: $query) {
      data {
        ...ConversionUnitFields
        id
        code
        unit {
          ...UnitFields
        }
        creator {
          ...UserFields
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${CONVERSION_UNIT_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
  ${UNIT_FRAGMENT}
`;
