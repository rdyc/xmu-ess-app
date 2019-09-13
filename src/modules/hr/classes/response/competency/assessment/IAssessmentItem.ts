import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IAssessmentItem {
  uid: string;
  assessmentUid: string;
  employeeUid: string;
  employee: IAccountEmployee;
  dueDate: string;
  isExpired: boolean;
  isRespond: boolean;
  changes?: IBaseChanges;
}