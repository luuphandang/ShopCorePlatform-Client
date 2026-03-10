# FileUpload Component

A flexible file upload component that supports simplified value format and parent-controlled file uploads.

## Features

- **Simplified Value Format**: Uses `{url: string, type: string}[]` instead of complex file objects
- **Parent-Controlled Uploads**: Parent components handle file uploads using the `useFileUpload` hook
- **Multiple File Support**: Upload single or multiple files
- **File Validation**: Built-in file type, size, and extension validation
- **Image Preview**: Automatic image preview with remove functionality
- **Upload Progress**: Shows upload status with `isUploading` prop
- **Customizable**: Configurable file types, sizes, and extensions

## Value Format

The component now uses a simplified value format:

```typescript
type TSimpleFileUpload = {
  url: string;
  type: string;
};
```

Instead of the complex `TBaseFileUploadSchema` format.

## Usage

### Basic Usage

```tsx
import { useState } from 'react';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadImageItem,
  FileUploadInfo,
} from '@/components/ui/file-upload';
import { useFileUpload } from '@/graphql/hooks';
import { EFileEntity } from '@/graphql/@types/graphql.type';

const MyComponent = () => {
  const { uploadFile } = useFileUpload();
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<TSimpleFileUpload[]>([]);

  const handleFileSelect = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = selectedFiles.map((file) => uploadFile(file, EFileEntity.Product));

      const uploadedFiles = await Promise.all(uploadPromises);
      const successfulUploads = uploadedFiles.filter(Boolean);

      if (successfulUploads.length > 0) {
        const newFiles: TSimpleFileUpload[] = successfulUploads.map((file) => ({
          url: file?.url || '',
          type: file?.type || 'image/jpeg',
        }));

        setFiles((prev) => [...prev, ...newFiles]);
      }
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onFileSelect={handleFileSelect}
      isUploading={isUploading}
      allowedFileTypes={['image/*']}
      allowedFileSize={10 * 1024 * 1024} // 10MB
      allowedFileExtensions={['.jpg', '.jpeg', '.png', '.gif', '.webp']}
    >
      <div className="grid grid-cols-4 gap-2">
        {files.map((_, index) => (
          <FileUploadImageItem key={index} index={index} />
        ))}
        <FileUploadTrigger multiple={true}>
          <div>Add Images</div>
        </FileUploadTrigger>
      </div>
      <FileUploadInfo />
    </FileUpload>
  );
};
```

### With Form Integration

```tsx
import { useFormContext } from 'react-hook-form';
import { FormField, FormControl, FormItem, FormLabel } from '@/components/ui/form';

const ProductForm = () => {
  const { control, setValue, watch } = useFormContext();
  const { uploadFile } = useFileUpload();
  const [isUploading, setIsUploading] = useState(false);

  // Watch current values
  const thumbnailValue = watch('thumbnail');
  const galleryValue = watch('gallery_images');

  // Convert to simple format
  const thumbnailSimpleValue: TSimpleFileUpload[] = thumbnailValue
    ? [{ url: thumbnailValue.url || '', type: thumbnailValue.type || 'image/jpeg' }]
    : [];

  const handleThumbnailUpload = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const uploadedFile = await uploadFile(files[0], EFileEntity.Product);

      if (uploadedFile) {
        setValue('thumbnail', {
          id: uploadedFile.id,
          code: uploadedFile.code,
          name: uploadedFile.name || '',
          url: uploadedFile.url || '',
          type: uploadedFile.type || 'image/jpeg',
          status: uploadedFile.status,
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormField
      control={control}
      name="thumbnail"
      render={() => (
        <FormItem>
          <FormLabel>Thumbnail</FormLabel>
          <FormControl>
            <FileUpload
              value={thumbnailSimpleValue}
              onValueChange={(files) => {
                if (files.length === 0) {
                  setValue('thumbnail', {
                    name: '',
                    url: '',
                    type: 'image/jpeg',
                  });
                }
              }}
              onFileSelect={handleThumbnailUpload}
              isUploading={isUploading}
              allowedFileTypes={['image/*']}
            >
              <div className="grid grid-cols-4 gap-2">
                {thumbnailSimpleValue.length > 0 && <FileUploadImageItem index={0} />}
                <FileUploadTrigger multiple={false}>
                  <div>Add Thumbnail</div>
                </FileUploadTrigger>
              </div>
              <FileUploadInfo />
            </FileUpload>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
```

## Props

### FileUpload

| Prop                    | Type                                   | Description                                                                            |
| ----------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| `value`                 | `TSimpleFileUpload[]`                  | Array of files in simplified format                                                    |
| `onValueChange`         | `(files: TSimpleFileUpload[]) => void` | Callback when files change                                                             |
| `children`              | `React.ReactNode`                      | Child components                                                                       |
| `onFileSelect`          | `(files: File[]) => void`              | Callback when files are selected (parent handles upload)                               |
| `isUploading`           | `boolean`                              | Whether files are currently uploading                                                  |
| `allowedFileTypes`      | `string[]`                             | Allowed MIME types (default: `['image/*', 'application/pdf', 'text/plain']`)           |
| `allowedFileSize`       | `number`                               | Maximum file size in bytes (default: `10MB`)                                           |
| `allowedFileExtensions` | `string[]`                             | Allowed file extensions (default: `['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt']`) |

### FileUploadTrigger

| Prop       | Type              | Description                                      |
| ---------- | ----------------- | ------------------------------------------------ |
| `multiple` | `boolean`         | Allow multiple file selection (default: `false`) |
| `accept`   | `string`          | HTML accept attribute                            |
| `children` | `React.ReactNode` | Trigger content                                  |

### FileUploadImageItem

| Prop        | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `index`     | `number` | Index of the file in the array |
| `className` | `string` | Additional CSS classes         |

### FileUploadInfo

| Prop        | Type              | Description                    |
| ----------- | ----------------- | ------------------------------ |
| `children`  | `React.ReactNode` | Custom info content (optional) |
| `className` | `string`          | Additional CSS classes         |

## Migration from Old Format

### Before (Complex Format)

```tsx
// Old value format
const files = [
  {
    id: 1,
    code: 'file_123',
    name: 'image.jpg',
    url: 'https://example.com/image.jpg',
    type: EFileType.Image,
    status: EFileStatus.Active,
    size: 1024000,
  },
];

// Old usage
<FileUpload value={files} onValueChange={setFiles} entity={EFileEntity.Product} />;
```

### After (Simplified Format)

```tsx
// New value format
const files = [
  {
    url: 'https://example.com/image.jpg',
    type: 'image/jpeg',
  },
];

// New usage
<FileUpload
  value={files}
  onValueChange={setFiles}
  onFileSelect={handleFileSelect}
  isUploading={isUploading}
/>;
```

## Benefits

1. **Simpler State Management**: Easier to manage file state with simplified format
2. **Better Separation of Concerns**: Upload logic is handled by parent components
3. **More Flexible**: Parent components can implement custom upload logic
4. **Better Performance**: Less complex object manipulation
5. **Easier Testing**: Simpler data structures for testing

## Example

See `example-usage.tsx` for a complete working example.
