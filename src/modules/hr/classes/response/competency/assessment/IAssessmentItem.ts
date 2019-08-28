import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IAssessmentItem {
  uid: string;
  assessmentUid: string;
  employeeUid: string;
  employee: IAccountEmployee;
  changes?: IBaseChanges;
}