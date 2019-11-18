import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IAssessmentItem {
  uid: string;
  assessmentUid: string;
  employeeUid: string;
  employee: IAccountEmployee;
  assessorType: string;
  assessor?: ICommonSystem;
  dueDate: string;
  isComplete: boolean;
  isExpired: boolean;
  isRespond: boolean;
  changes?: IBaseChanges;
}