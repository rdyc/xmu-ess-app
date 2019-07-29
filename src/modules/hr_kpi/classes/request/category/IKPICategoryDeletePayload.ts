import { IBasePayload } from '@generic/interfaces';

export interface IKPICategoryDeletePayload extends IBasePayload {
  categoryUid: string;
}