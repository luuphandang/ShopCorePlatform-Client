import { gql } from '@apollo/client';

import { PRODUCT_ATTRIBUTE_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_PRODUCT_ATTRIBUTE = gql`
  mutation CreateProductAttribute($data: CreateProductAttributeInput!) {
    createProductAttribute(data: $data) {
      ...ProductAttributeFields
    }
  }
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
`;

export const UPDATE_PRODUCT_ATTRIBUTE = gql`
  mutation UpdateProductAttribute($id: Int!, $data: UpdateProductAttributeInput!) {
    updateProductAttribute(id: $id, data: $data) {
      ...ProductAttributeFields
    }
  }
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
`;
