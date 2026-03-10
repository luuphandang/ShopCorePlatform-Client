'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AssignFileUploadInput,
  CreateFileUploadInput,
  EFileType,
  UpdateFileMutation,
  UpdateFileMutationVariables,
  WebsiteSignedUrlMutation,
  WebsiteSignedUrlMutationVariables,
} from '@/graphql/@types';
import { UPDATE_FILE, WEBSITE_SIGNED_URL } from '@/graphql/gql';
import { TFileUploadSchema } from '@/shared/schema';
import { AWSUtil } from '@/shared/utils';

type SignedUrlOptions = Omit<
  MutationHookOptions<
    WebsiteSignedUrlMutation,
    WebsiteSignedUrlMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;

export const useSignedUrlMutation = (options?: SignedUrlOptions) => {
  return useMutation<WebsiteSignedUrlMutation, WebsiteSignedUrlMutationVariables>(
    WEBSITE_SIGNED_URL,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      ...options,
    },
  );
};

type UpdateFileOptions = Omit<
  MutationHookOptions<
    UpdateFileMutation,
    UpdateFileMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;

export const useUpdateFileMutation = (options?: UpdateFileOptions) => {
  return useMutation<UpdateFileMutation, UpdateFileMutationVariables>(UPDATE_FILE, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};

export const useFileUpload = () => {
  const [getSignedUrl] = useSignedUrlMutation();
  const [updateFile] = useUpdateFileMutation();

  const uploadFile = async (file: File) => {
    try {
      const { data: signedUrlData } = await getSignedUrl({
        variables: {
          data: {
            file_name: file.name,
            file_type: file.type,
          },
        },
      });

      if (
        !signedUrlData?.websiteSignedUrl?.signed_url ||
        !signedUrlData?.websiteSignedUrl?.file_upload
      ) {
        throw new Error('Failed to get signed URL');
      }

      const { signed_url, file_upload } = signedUrlData.websiteSignedUrl;

      const fileUrl = await AWSUtil.uploadFileToS3(signed_url, file);
      if (!fileUrl) {
        throw new Error('Failed to upload file to S3');
      }

      const { data: updateData } = await updateFile({
        variables: {
          id: file_upload.id,
          data: { size: file.size },
        },
      });

      return updateData?.updateFile || null;
    } catch (error) {
      console.error('[useFileUpload:uploadFile]:', error);
      return null;
    }
  };

  return {
    uploadFile,
  };
};

export const normalizeFileUpload = (file: TFileUploadSchema): CreateFileUploadInput => ({
  name: file.name || '',
  url: file.url || '',
  type: file.type || EFileType.Image,
});

export const normalizeAssignFileUpload = (file: TFileUploadSchema): AssignFileUploadInput => ({
  id: file.id,
  ...normalizeFileUpload(file),
});
