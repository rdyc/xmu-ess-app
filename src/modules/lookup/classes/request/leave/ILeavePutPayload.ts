import { IBasePayload } from '@generic/interfaces';

export interface ILeavePutPayload extends IBasePayload {
  companyUid: string;
  categoryType: string;
  year: number;
  name: string;
  allocation: number;
}