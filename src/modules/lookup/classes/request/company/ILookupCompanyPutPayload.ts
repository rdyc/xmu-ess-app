import { IBasePayload } from '@generic/interfaces';

export interface ILookupCompanyPutPayload extends IBasePayload {
  code:  string;
  name: string;
}