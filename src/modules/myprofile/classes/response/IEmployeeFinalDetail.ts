import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';
import { ICompetencyEmployeeItemFinal } from './ICompetencyEmployeeItemFinal';

export interface IEmployeeFinalDetail {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  positionUid: string;
  position?: ILookupPosition;
  score?: number;
  statusType: string;
  status?: ICommonSystem;
  assessmentYear?: number;
  items: ICompetencyEmployeeItemFinal[];
  changes?: IBaseChanges;
}