import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';
import { IAssessmentItem } from './IAssessmentItem';

export interface IHrCompetencyAssessmentDetail {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  employeeUid: string;
  employee: IAccountEmployee;
  assessmentYear: number;
  responders: IAssessmentItem[];
  isDraft: boolean;
  changes?: IBaseChanges;
}