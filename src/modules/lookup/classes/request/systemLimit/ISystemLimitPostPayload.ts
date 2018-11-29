import { IBasePayload } from '@generic/interfaces';

export interface ISystemLimitPostPayload extends IBasePayload {
  categoryType: string;
  days: number;
}