import { Attachment } from '../../types/Attachment';

export declare type FileMetadata = {
  [key: string]: any;
};
export interface File {
  name: string;
  size: number;
  type: string;
  path: string;
  metadata?: FileMetadata;
}
export declare type DirectUploadResultStatus =
  | 'success'
  | 'uploading'
  | 'error'
  | 'waiting'
  | 'canceled';
export interface DirectUploadResultBase {
  id: number;
  status: DirectUploadResultStatus;
  file: File;
  cancel: () => void;
}
export interface DirectUploadResultError extends DirectUploadResultBase {
  status: 'error';
  error: Error;
}
export interface DirectUploadResultSuccess extends DirectUploadResultBase {
  status: 'success';
}
export interface DirectUploadResultWaiting extends DirectUploadResultBase {
  status: 'waiting';
}
export interface DirectUploadResultCanceled extends DirectUploadResultBase {
  status: 'canceled';
}
export interface DirectUploadResultUploading extends DirectUploadResultBase {
  status: 'uploading';
  progress: number;
  totalBytes: number;
  uploadedBytes: number;
}
export declare type DirectUploadResult =
  | DirectUploadResultError
  | DirectUploadResultSuccess
  | DirectUploadResultWaiting
  | DirectUploadResultCanceled
  | DirectUploadResultUploading;
declare type WithoutDirectUploadBaseParams<T> = Omit<T, 'id' | 'cancel' | 'file'>;
export declare type HandleStatusUpdateData =
  | WithoutDirectUploadBaseParams<DirectUploadResultError>
  | WithoutDirectUploadBaseParams<DirectUploadResultUploading>
  | WithoutDirectUploadBaseParams<DirectUploadResultWaiting>
  | WithoutDirectUploadBaseParams<DirectUploadResultCanceled>
  | WithoutDirectUploadBaseParams<DirectUploadResultSuccess>;

export interface UploadFile {
  /**
   * URI to the local image or video file (usable as the source of an `Image` element, in the case of
   * an image) and `width` and `height` specify the dimensions of the media.
   */
  uri: string;
  /**
   * Width of the image or video.
   */
  width: number;
  /**
   * Height of the image or video.
   */
  height: number;
  /**
   * The type of the asset.
   */
  type?: 'image' | 'video';
  /**
   * The `exif` field is included if the `exif` option is truthy, and is an object containing the
   * image's EXIF data. The names of this object's properties are EXIF tags and the values are the
   * respective EXIF values for those tags.
   */
  exif?: Record<string, any>;
  /**
   * Included if the `base64` option is truthy, and is a Base64-encoded string of the selected
   * image's JPEG data. If you prepend this with `'data:image/jpeg;base64,'` to create a data URI,
   * you can use it as the source of an `Image` element; for example:
   * ```ts
   * <Image
   *   source={{ uri: 'data:image/jpeg;base64,' + launchCameraResult.base64 }}
   *   style={{ width: 200, height: 200 }}
   * />
   * ```
   */
  base64?: string;
  /**
   * Length of the video in milliseconds.
   */
  duration?: number;
}

export type Upload = (uploadFiles: UploadFile[]) => Promise<
  | {
      signedIds: string[];
    }
  | {
      signedIds?: undefined;
    }
>;

interface UseAttachmentUploadResult {
  upload: Upload;
  attachments?: (Attachment | undefined)[];
  uploading: boolean;
}

interface UseAttachmentUploadInput {
  relatedId: number;
  relatedType: string;
  attribute: string;
  onSuccess: (params: any) => void;
  onError: (params: unknown) => void;
}

export type UseAttachmentUpload = (params: UseAttachmentUploadInput) => UseAttachmentUploadResult;
