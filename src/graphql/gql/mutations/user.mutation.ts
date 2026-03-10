import { gql } from '@apollo/client';

import { FILE_UPLOAD_FRAGMENT, USER_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      ...UserFields
      avatar {
        ...FileUploadFields
      }
    }
  }
  ${USER_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      ...UserFields
      avatar {
        ...FileUploadFields
      }
    }
  }
  ${USER_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
`;
