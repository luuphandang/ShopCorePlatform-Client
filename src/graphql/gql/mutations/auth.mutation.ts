import { gql } from '@apollo/client';

import { FILE_UPLOAD_FRAGMENT, USER_FRAGMENT } from '@/graphql/gql/fragments';

export const SIGN_UP = gql`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      access_token
      options {
        httpOnly
        secure
        sameSite
        path
        maxAge
        domain
      }
      user {
        ...UserFields
        id
        code
        avatar {
          ...FileUploadFields
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
`;

export const SIGN_IN = gql`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
      access_token
      options {
        httpOnly
        secure
        sameSite
        path
        maxAge
        domain
      }
      user {
        ...UserFields
        id
        code
        avatar {
          ...FileUploadFields
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      access_token
      options {
        httpOnly
        secure
        sameSite
        path
        maxAge
        domain
      }
      user {
        ...UserFields
        id
        code
        avatar {
          ...FileUploadFields
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
`;
