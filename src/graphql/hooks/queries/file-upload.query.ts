'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  FileUpload,
  FileUploadQuery,
  FileUploadQueryVariables,
  FileUploadsQuery,
  FileUploadsQueryVariables,
} from '@/graphql/@types';
import { FILE_UPLOAD, FILE_UPLOADS } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetFileUploadOptions = Omit<
  QueryHookOptions<FileUploadQuery, FileUploadQueryVariables>,
  'variables'
> &
  IGetOneProps<FileUpload>;

type GetFileUploadsOptions = Omit<
  QueryHookOptions<FileUploadsQuery, FileUploadsQueryVariables>,
  'variables'
> &
  IPaginationProps<FileUpload>;

export const useFileUploadQuery = ({ where, ...options }: GetFileUploadOptions) => {
  return useQuery<FileUploadQuery, FileUploadQueryVariables>(FILE_UPLOAD, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};

export const useFileUploadsQuery = ({
  where,
  pagination,
  order,
  ...options
}: GetFileUploadsOptions) => {
  return useQuery<FileUploadsQuery, FileUploadsQueryVariables>(FILE_UPLOADS, {
    variables: {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};
