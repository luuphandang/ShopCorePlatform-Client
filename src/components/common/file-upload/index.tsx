'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button, Input } from '@/components/ui';
import { EFileEntity, FileUpload } from '@/graphql/@types';
import { useFileUpload } from '@/graphql/hooks';
import { toast } from '@/hooks/index';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_FILE_SIZE, ALLOWED_FILE_TYPES } from '@/shared/constants';
import { StringUtil } from '@/shared/utils';

interface FileUploadComponentProps {
  id?: string;
  entity?: EFileEntity;
  setFileUpload: (files: FileUpload[]) => void;
  initialValues?: FileUpload[];
  isMultiple?: boolean;
  allowedFileTypes?: string[];
  allowedFileSize?: number;
  allowedFileExtensions?: string[];
}

const FileUploadComponent = ({
  id = 'upload-file',
  entity,
  initialValues = [],
  setFileUpload,
  isMultiple = false,
  allowedFileTypes = ALLOWED_FILE_TYPES,
  allowedFileSize = ALLOWED_FILE_SIZE,
  allowedFileExtensions = ALLOWED_FILE_EXTENSIONS,
}: FileUploadComponentProps) => {
  const [files, setFiles] = useState<FileUpload[]>(initialValues);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile } = useFileUpload();

  const validateFile = (file: File): boolean => {
    if (!allowedFileTypes.includes(file.type)) {
      toast({
        title: 'Loại file không hợp lệ',
        description: `File ${file.name} không được hỗ trợ. Chỉ chấp nhận file ${allowedFileTypes.join(', ')}`,
        variant: 'destructive',
      });
      return false;
    }

    if (file.size > allowedFileSize) {
      toast({
        title: 'File quá lớn',
        description: `File ${file.name} phải nhỏ hơn ${allowedFileSize / 1024 / 1024}MB`,
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(validateFile);

    if (validFiles.length === 0) return;

    try {
      setIsUploading(true);
      if (!entity) throw new Error('Không xác định được đối tượng quản lý file');

      const responses = await Promise.all(validFiles.map((file) => uploadFile(file)));
      const successfulUploads = responses.filter(Boolean) as FileUpload[];

      if (successfulUploads.length > 0) {
        setFiles(successfulUploads);
        setFileUpload(successfulUploads);

        toast({
          title: 'Tải lên thành công',
          description: `${successfulUploads.length} file(s) đã được tải lên thành công`,
          variant: 'success',
        });
      }
    } catch (error) {
      toast({
        title: 'Tải lên thất bại',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setFileUpload(newFiles);
  };

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-medium">Đính kèm file (tùy chọn)</p>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={allowedFileExtensions.join(',')}
          disabled={isUploading}
          multiple={isMultiple}
        />
        <label
          htmlFor={id}
          className={`cursor-pointer inline-flex items-center justify-center text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? 'Đang tải lên...' : 'Chọn file'}
        </label>
      </div>
      <div className="grid grid-cols-9 md:grid-cols-10 lg:grid-cols-11 gap-2 mt-4">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg border overflow-hidden">
              {file.type === 'IMAGE' && file.url ? (
                <Image
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  width={2000}
                  height={2000}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-xs text-muted-foreground">
                    {file.name.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <Button
              onClick={() => handleRemoveFile(index)}
              className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="mt-1 text-xs text-muted-foreground truncate">{file.name}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Hỗ trợ định dạng: {allowedFileTypes.join(', ')} (Kích thước tối đa:{' '}
        {allowedFileSize / 1024 / 1024}MB)
      </p>
    </div>
  );
};
FileUploadComponent.displayName = 'FileUploadComponent';

export { FileUploadComponent };
