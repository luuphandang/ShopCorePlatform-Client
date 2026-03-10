export class AWSUtil {
  static async uploadFileToS3(signedUrl: string, file: File): Promise<boolean> {
    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `S3 upload failed with status ${response.status}: ${response.statusText}. ${errorText}`,
        );
      }

      return true;
    } catch (error) {
      console.error('[AWSUtil:uploadFileToS3]: ', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    return false;
  }
}
