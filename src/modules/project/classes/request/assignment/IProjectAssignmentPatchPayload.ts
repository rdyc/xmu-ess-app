import { IBasePayload } from '@generic/interfaces';

export interface IProjectAssignmentItem {
  uid: string | null;
  employeeUid: string;
  role: string;
  jobDescription: string;
  mandays: number;
}

export interface IProjectAssignmentPatchPayload extends IBasePayload {
  items: IProjectAssignmentItem[];
}