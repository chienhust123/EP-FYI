import axios from 'axios';

export const uploadImageToPresignedUrl = async (presignedUrl: string, selectedFile: File) => {
  const resp = await axios.put(presignedUrl, selectedFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return resp.data;
};
