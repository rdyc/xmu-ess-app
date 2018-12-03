import { IBasePayload } from '@generic/interfaces';

export interface ISystemLimitPutPayload extends IBasePayload {
  categoryType: string;
  days: number;
}