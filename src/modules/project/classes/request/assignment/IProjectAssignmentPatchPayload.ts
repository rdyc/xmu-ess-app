import { IBasePayload } from '@generic/interfaces';

export interface IProjectAssignmentItem {
  uid?: string;
  employeeUid: string;
  role?: string;
  jobDescription?: string;
  mandays: number;
}

export interface IProjectAssignmentPatchPayload extends IBasePayload {
  items: IProjectAssignmentItem[];
}