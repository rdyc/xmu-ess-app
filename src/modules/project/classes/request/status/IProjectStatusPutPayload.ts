import { IBasePayload } from '@generic/interfaces';

export interface IProjectStatusPutPayload extends IBasePayload {
  statusType: string;
}