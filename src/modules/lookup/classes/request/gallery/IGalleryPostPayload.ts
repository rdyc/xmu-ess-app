import { IBasePayload } from '@generic/interfaces';

export interface IGalleryPostPayload extends IBasePayload {
  file: FileList;
}