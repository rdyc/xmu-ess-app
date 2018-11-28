import { IBasePayload } from '@generic/interfaces';

export interface ILookupRolePostPayload extends IBasePayload {
  gradeType: string;
  name: string;
  description: string;
  isActive: boolean;
}