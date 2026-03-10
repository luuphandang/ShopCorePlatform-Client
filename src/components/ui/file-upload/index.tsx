'use client';

import { File, Image as ImageIcon, PlusSquare, X } from 'lucide-react';
import Image from 'next/image';
import React, { createContext, useContext } from 'react';

import { Button } from '@/components/ui/button';
import { EFileType } from '@/graphql/@types/graphql.type';
import { cn } from '@/libs/utils';

export type TSimpleFileUpload = {
  name: string;
  url: string;
  type: string;
};
type FileUploadContextType = {
  files: TSimpleFileUpload[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (index: number) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
  validateFile: (file: File) => boolean;
  allowedFileTypes: string[];
  allowedFileSize: number;
  allowedFileExtensions: string[];
  onFileSelect?: (files: File[]) => void;
};
const FileUploadContext = createContext<FileUploadContextType | null>(null);
const useFileUploadContext = () => {
  const context = useContext(FileUploadContext);
  if (!context) throw new Error('Must be used inside <FileUpload>');
  return context;
};

interface FileUploadProps {
  value: TSimpleFileUpload[];
  onValueChange: (files: TSimpleFileUpload[]) => void;
  children: React.ReactNode;
  allowedFileTypes?: string[];
  allowedFileSize?: number;
  allowedFileExtensions?: string[];
  onFileSelect?: (files: File[]) => void;
  isUploading?: boolean;
}
const FileUpload = ({
  value,
  onValueChange,
  children,
  allowedFileTypes = ['image/*', 'application/pdf', 'text/plain'],
  allowedFileSize = 10 * 1024 * 1024,
  allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt'],
  onFileSelect,
  isUploading: externalIsUploading = false,
}: FileUploadProps) => {
  const [internalIsUploading, setInternalIsUploading] = React.useState(false);
  const isUploading = externalIsUploading || internalIsUploading;

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(validateFile);
    if (validFiles.length === 0) return;

    if (onFileSelect) {
      onFileSelect(validFiles);
      return;
    }

    setInternalIsUploading(true);
    console.warn('No onFileSelect provided, file upload not handled');
    setInternalIsUploading(false);
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onValueChange(newFiles);
  };

  const validateFile = (file: File): boolean => {
    const isValidType = allowedFileTypes.some((type) => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type === type;
    });

    if (!isValidType) {
      console.warn(`File ${file.name} has unsupported type: ${file.type}`);
      return false;
    }

    if (file.size > allowedFileSize) {
      console.warn(`File ${file.name} is too large: ${file.size} bytes`);
      return false;
    }

    return true;
  };

  const contextValue: FileUploadContextType = {
    files: value,
    addFiles,
    removeFile,
    isUploading,
    setIsUploading: setInternalIsUploading,
    validateFile,
    allowedFileTypes,
    allowedFileSize,
    allowedFileExtensions,
    onFileSelect,
  };

  return <FileUploadContext.Provider value={contextValue}>{children}</FileUploadContext.Provider>;
};
FileUpload.displayName = 'FileUpload';

interface FileUploadTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  placeholder?: string;
  multiple?: boolean;
  accept?: string;
}
const FileUploadTrigger = ({
  children,
  className,
  multiple = false,
  accept,
  ...props
}: FileUploadTriggerProps) => {
  const { addFiles, isUploading, allowedFileExtensions } = useFileUploadContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      addFiles(files);
      e.target.value = '';
    }
  };

  return (
    <div
      className={cn(
        'w-full min-h-10 border rounded-md flex items-center justify-center px-3 py-2 gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors border-dashed border-2 hover:border-primary transition-colors aspect-square',
        isUploading && 'opacity-50 cursor-not-allowed',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children || (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
          <PlusSquare className="h-8 w-8 text-muted-foreground" strokeWidth={1} />
          <div className="text-sm text-muted-foreground text-center">
            Chọn hoặc kéo thả file tại đây
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept || allowedFileExtensions.join(',')}
        disabled={isUploading}
      />
    </div>
  );
};
FileUploadTrigger.displayName = 'FileUploadTrigger';

interface FileUploadListProps {
  children?: React.ReactNode;
  className?: string;
}
const FileUploadList = ({ children, className }: FileUploadListProps) => {
  const { files } = useFileUploadContext();

  if (files.length === 0) return null;

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2', className)}>
      {children}
    </div>
  );
};
FileUploadList.displayName = 'FileUploadList';

interface FileUploadItemProps {
  index: number;
  children?: React.ReactNode;
  className?: string;
}
const FileUploadItem = ({ index, children, className }: FileUploadItemProps) => {
  const { files, removeFile } = useFileUploadContext();
  const file = files[index];

  if (!file) return null;

  const isImage = file.type === EFileType.Image || file.type.startsWith('image/');

  return (
    <div className={cn('relative group', className)}>
      <div className="aspect-square rounded-lg border overflow-hidden bg-muted">
        {isImage ? (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <File className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>
      <Button
        onClick={() => removeFile(index)}
        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </Button>
      <p className="mt-1 text-xs text-muted-foreground truncate">
        {file.url.split('/').pop() || 'File'}
      </p>
      {children}
    </div>
  );
};
FileUploadItem.displayName = 'FileUploadItem';

interface FileUploadImageItemProps {
  index: number;
  className?: string;
}
const FileUploadImageItem = ({ index, className }: FileUploadImageItemProps) => {
  const { files, removeFile } = useFileUploadContext();
  const file = files[index];

  if (!file) return null;

  const isImage = file.type === EFileType.Image || file.type.startsWith('image/');

  return (
    <div className={cn('relative group', className)}>
      <div className="aspect-square rounded-lg border overflow-hidden bg-muted">
        {isImage && file.url ? (
          <Image
            src={file.url}
            alt={file.url.split('/').pop() || 'Image'}
            className="w-full h-full object-cover"
            width={200}
            height={200}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>
      <Button
        onClick={() => removeFile(index)}
        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </Button>
      <p className="mt-1 text-xs text-muted-foreground truncate">
        {file.url.split('/').pop() || 'Image'}
      </p>
    </div>
  );
};
FileUploadImageItem.displayName = 'FileUploadImageItem';

interface FileUploadInfoProps {
  children?: React.ReactNode;
  className?: string;
}
const FileUploadInfo = ({ children, className }: FileUploadInfoProps) => {
  const { allowedFileTypes, allowedFileSize } = useFileUploadContext();

  return (
    <div className={cn('text-xs text-muted-foreground mt-2', className)}>
      {children || (
        <React.Fragment>
          Hỗ trợ định dạng: {allowedFileTypes.join(', ')} (Kích thước tối đa:{' '}
          {Math.round(allowedFileSize / 1024 / 1024)}MB)
        </React.Fragment>
      )}
    </div>
  );
};
FileUploadInfo.displayName = 'FileUploadInfo';

export {
  FileUpload,
  FileUploadImageItem,
  FileUploadInfo,
  FileUploadItem,
  FileUploadList,
  FileUploadTrigger,
};
