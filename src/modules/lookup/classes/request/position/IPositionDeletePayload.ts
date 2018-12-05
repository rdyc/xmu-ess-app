import { IBasePayload } from '@generic/interfaces';

export interface IPositionDeletePayload extends IBasePayload {
  positionUid: string;
}