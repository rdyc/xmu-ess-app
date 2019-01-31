import { IBasePayload } from '@generic/interfaces';

export interface ILookupVersionPatchPayload extends IBasePayload {
  major: number;
  minor: number;
  revision: number;
  notes: string;
}