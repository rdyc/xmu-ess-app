import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IPosition } from '@lookup/classes/response';
import { IAssessmentItem } from './IAssessmentItem';

export interface IHrCompetencyAssessment {
  uid: string;
  positionUid: string;
  position: IPosition;
  employeeUid: string;
  employee: IAccountEmployee;
  assessmentYear: number;
  responders?: IAssessmentItem[];
  changes?: IBaseChanges;
}