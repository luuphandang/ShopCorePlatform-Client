import { gql } from '@apollo/client';

import {
  CATEGORY_FRAGMENT,
  CONVERSION_UNIT_FRAGMENT,
  FILE_UPLOAD_FRAGMENT,
  PRODUCT_ATTRIBUTE_FRAGMENT,
  PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
  UNIT_FRAGMENT,
} from '@/graphql/gql/fragments';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      ...ProductFields
      id
      code
      slug
      sku
      type
      features
      turnaround
      short_description
      description
      status
      likes
      average_rating
      rating_count
      thumbnail {
        ...FileUploadFields
        id
        code
      }
      gallery_images {
        ...FileUploadFields
        id
        code
      }
      categories {
        ...CategoryFields
        id
        code
      }
      base_unit {
        ...ConversionUnitFields
        id
        code
        unit {
          ...UnitFields
          id
          code
        }
      }
      conversion_units {
        ...ConversionUnitFields
        id
        code
        unit {
          ...UnitFields
          id
          code
        }
      }
      attributes {
        ...ProductAttributeFields
        id
        code
        values {
          ...ProductAttributeValueFields
          id
          code
        }
      }
      values {
        ...ProductAttributeValueFields
        id
        code
      }
      variants {
        ...ProductVariantFields
        id
        code
        status
        attributes {
          ...ProductAttributeFields
          id
          code
          values {
            ...ProductAttributeValueFields
            id
            code
          }
        }
        values {
          ...ProductAttributeValueFields
          id
          code
        }
        base_unit {
          ...ConversionUnitFields
          id
          code
          unit {
            ...UnitFields
            id
            code
          }
        }
        conversion_units {
          ...ConversionUnitFields
          id
          code
          unit {
            ...UnitFields
            id
            code
          }
        }
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
  ${PRODUCT_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      ...ProductFields
      id
      code
      slug
      sku
      type
      features
      turnaround
      short_description
      description
      status
      likes
      average_rating
      rating_count
      thumbnail {
        ...FileUploadFields
        id
        code
      }
      gallery_images {
        ...FileUploadFields
        id
        code
      }
      categories {
        ...CategoryFields
        id
        code
      }
      base_unit {
        ...ConversionUnitFields
        id
        code
        unit {
          ...UnitFields
          id
          code
        }
      }
      conversion_units {
        ...ConversionUnitFields
        id
        code
        unit {
          ...UnitFields
          id
          code
        }
      }
      attributes {
        ...ProductAttributeFields
        id
        code
        values {
          ...ProductAttributeValueFields
          id
          code
        }
      }
      values {
        ...ProductAttributeValueFields
        id
        code
      }
      variants {
        ...ProductVariantFields
        id
        code
        status
        attributes {
          ...ProductAttributeFields
          id
          code
          values {
            ...ProductAttributeValueFields
            id
            code
          }
        }
        values {
          ...ProductAttributeValueFields
          id
          code
        }
        base_unit {
          ...ConversionUnitFields
          id
          code
          unit {
            ...UnitFields
            id
            code
          }
        }
        conversion_units {
          ...ConversionUnitFields
          id
          code
          unit {
            ...UnitFields
            id
            code
          }
        }
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
  ${PRODUCT_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;
