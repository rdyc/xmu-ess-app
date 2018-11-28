import { IBasePayload } from '@generic/interfaces';

export interface ILookupLeavePutPayload extends IBasePayload {
  companyUid: string;
  categoryType: string;
  year: number;
  name: string;
  allocation: number;
}