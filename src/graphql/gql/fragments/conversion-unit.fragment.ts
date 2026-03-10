import { gql } from '@apollo/client';

export const CONVERSION_UNIT_FRAGMENT = gql`
  fragment ConversionUnitFields on ConversionUnit {
    product_id
    variant_id
    unit_id
    conversion_rate
    regular_price
    sale_price
    price
    created_at
  }
`;
