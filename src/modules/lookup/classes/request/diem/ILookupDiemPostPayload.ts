import { IBasePayload } from '@generic/interfaces';

export interface ILookupDiemPostPayload extends IBasePayload {
  // todo
  currencyUid: string;
  projectType: string;
  destinationType: string;
  value: number;
}