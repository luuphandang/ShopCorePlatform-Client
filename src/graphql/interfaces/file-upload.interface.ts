import { CreateFileUploadInput, UpdateFileUploadInput } from '../@types/graphql.type';

export interface ICreateFileProps {
  data: CreateFileUploadInput;
}

export interface IUpdateFileProps {
  id: number;
  data: UpdateFileUploadInput;
}

export interface IUploadFileProps {
  file: File;
}
