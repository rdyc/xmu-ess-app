import { IBasePayload } from '@generic/interfaces';

export interface ILookupDiemPutPayload extends IBasePayload {
  // todo
  currencyUid: string;
  projectType: string;
  destinationType: string;
  value: number;
}