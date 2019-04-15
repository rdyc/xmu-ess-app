import { IBasePayload } from '@generic/interfaces';

export interface ILookupCompanyPostPayload extends IBasePayload {
  code:  string;
  name: string;
}