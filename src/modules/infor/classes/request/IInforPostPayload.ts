import { IBasePayload } from '@generic/interfaces';

export interface IInforPostPayload extends IBasePayload {
  file: FileList;
}