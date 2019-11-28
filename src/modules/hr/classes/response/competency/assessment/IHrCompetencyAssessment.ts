import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';
import { IAssessmentItem } from './IAssessmentItem';

export interface IHrCompetencyAssessment {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  employeeUid: string;
  employee: IAccountEmployee;
  assessmentYear: number;
  responders?: IAssessmentItem[];
  isDraft: boolean;
  totalResponder?: number;
  totalResponse?: number;
  statusType: string;
  status?: ICommonSystem;
  changes?: IBaseChanges;
}