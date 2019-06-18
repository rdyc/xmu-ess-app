import { IBasePayload } from '@generic/interfaces';

export interface IProjectOwnerPutPayload extends IBasePayload {
  employeeUid?: string | null;
  projectType: string;
}