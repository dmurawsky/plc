// Services
import { firebaseStoragePut, pushKey } from "./firebase";

// Types

export const uploadFile = async ({
  file,
  dataKey = pushKey("publicData/images"),
}: {
  dataKey?: string;
  file: Blob | Uint8Array | ArrayBuffer;
}) => {
  const downloadUrl = await firebaseStoragePut(
    `publicData/images/${dataKey}`,
    file
  );

  return { dataKey, downloadUrl };
};
