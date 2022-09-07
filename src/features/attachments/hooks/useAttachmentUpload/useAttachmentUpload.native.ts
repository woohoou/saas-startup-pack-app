import { useState } from 'react';
import { useDirectUpload } from 'react-native-activestorage';
import RNFetchBlob from 'rn-fetch-blob';
import { createAttachment } from '../../attachment.api';
import { Attachment } from '../../types/Attachment';

import { File, Upload, UseAttachmentUpload } from './useAttachmentUpload.types';

export const useAttachmentUpload: UseAttachmentUpload = ({
  relatedId,
  relatedType,
  attribute,
  onSuccess: onSuccessCb,
  onError: onErrorCb,
}) => {
  const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<(Attachment | undefined)[]>();

  const onSuccess = async ({ signedIds }: { signedIds: string[] }) => {
    if (relatedId && relatedType && attribute) {
      try {
        setUploadInProgress(true);

        const createAttachments: Promise<Attachment | undefined>[] = signedIds.map(
          async (signedId) => createAttachment({ signedId, relatedId, relatedType, attribute })
        );

        const attachments = await Promise.all(createAttachments);
        onSuccessCb(attachments);
        if (attachments) {
          setAttachments(attachments);
        }
      } catch (err: any) {
        onErrorCb(err);
      } finally {
        setUploadInProgress(false);
      }
    }
  };

  const { upload, uploading } = useDirectUpload({
    onSuccess,
    onError: onErrorCb,
  });

  const nativeUpload: Upload = async (uploadFiles) => {
    const uploads = uploadFiles.map(async (uploadFile) => {
      if (uploadFile.type) {
        const stat = await RNFetchBlob.fs.stat(uploadFile.uri);
        let mimeType: string = stat.type;
        switch (uploadFile.type) {
          case 'image':
            mimeType = 'image/jpeg';
            break;
          case 'video':
            mimeType = 'video/mp4';
            break;
        }
        if (stat) {
          const fileWithInfo: File = {
            name: stat.filename,
            size: stat.size,
            type: mimeType,
            path: stat.path,
          };
          return fileWithInfo;
        } else {
          throw new Error('Cannot get file info');
        }
      } else {
        throw new Error('Error uploading the file');
      }
    });

    const filesWithInfo = await Promise.all(uploads);
    return upload(filesWithInfo);
  };

  return {
    upload: nativeUpload,
    uploading: uploading || uploadInProgress,
    attachments,
  };
};
