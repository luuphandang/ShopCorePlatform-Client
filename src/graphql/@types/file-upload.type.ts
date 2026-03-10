import { FileUploadQuery, FileUploadsQuery } from './graphql.type';

export type TFileUploadQuery = FileUploadQuery['file'];

export type TFileUploadsQuery = FileUploadsQuery['files']['data'];
