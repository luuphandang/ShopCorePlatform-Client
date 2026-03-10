import { gql } from '@apollo/client';

import {
  CATEGORY_FRAGMENT,
  CONVERSION_UNIT_FRAGMENT,
  FILE_UPLOAD_FRAGMENT,
  METADATA_FRAGMENT,
  PRODUCT_ATTRIBUTE_FRAGMENT,
  PRODUCT_ATTRIBUTE_VALUE_FRAGMENT,
  PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
  UNIT_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const PRODUCT = gql`
  query Product($query: GetOneInput) {
    product(query: $query) {
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
  ${PRODUCT_ATTRIBUTE_VALUE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const PRODUCTS = gql`
  query Products($query: GetManyInput) {
    products(query: $query) {
      data {
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
        thumbnail_id
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
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${METADATA_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
  ${PRODUCT_ATTRIBUTE_FRAGMENT}
  ${PRODUCT_ATTRIBUTE_VALUE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${USER_FRAGMENT}
`;
