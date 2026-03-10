import { gql } from '@apollo/client';

import { PRODUCT_ATTRIBUTE_VALUE_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_PRODUCT_ATTRIBUTE_VALUE = gql`
  mutation CreateProductAttributeValue($data: CreateProductAttributeValueInput!) {
    createProductAttributeValue(data: $data) {
      ...ProductAttributeValueFields
    }
  }
  ${PRODUCT_ATTRIBUTE_VALUE_FRAGMENT}
`;

export const UPDATE_PRODUCT_ATTRIBUTE_VALUE = gql`
  mutation UpdateProductAttributeValue($id: Int!, $data: UpdateProductAttributeValueInput!) {
    updateProductAttributeValue(id: $id, data: $data) {
      ...ProductAttributeValueFields
    }
  }
  ${PRODUCT_ATTRIBUTE_VALUE_FRAGMENT}
`;
