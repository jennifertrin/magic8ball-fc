import { put } from '@vercel/blob';

export interface BlobUploadResult {
  url: string;
  pathname: string;
  contentType: string;
  contentDisposition: string;
}

export const uploadToVercelBlob = async (
  file: File | Blob,
  filename: string
): Promise<BlobUploadResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw new Error('Failed to upload to Vercel Blob');
  }
};

export const uploadImageToVercelBlob = async (
  imageBlob: Blob,
  filename: string = 'magic8ball-result.png'
): Promise<string> => {
  const result = await uploadToVercelBlob(imageBlob, filename);
  return result.url;
};

export const uploadMetadataToVercelBlob = async (
  metadata: any,
  filename: string = 'metadata.json'
): Promise<string> => {
  const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
    type: 'application/json',
  });
  
  const result = await uploadToVercelBlob(metadataBlob, filename);
  return result.url;
}; 