import { IBasePayload } from '@generic/interfaces';

export interface ILeaveCancellationPostPayload extends IBasePayload {
  cancelDate: string | null;
}