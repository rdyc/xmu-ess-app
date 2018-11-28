import { IBasePayload } from '@generic/interfaces';

export interface ILookupRolePutPayload extends IBasePayload {
  gradeType: string;
  name: string;
  description: string;
  isActive: boolean;
}