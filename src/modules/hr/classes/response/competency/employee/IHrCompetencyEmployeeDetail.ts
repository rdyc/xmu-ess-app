import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';
import { ICompetencyEmployeeItem } from './ICompetencyEmployeeItem';

export interface IHrCompetencyEmployeeDetail {
  uid: string;
  assessmentUid?: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  respondenUid: string;
  responden?: IAccountEmployee;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  score?: number;
  statusType: string;
  status?: ICommonSystem;
  dueDate?: string;
  assessmentYear: number;
  isDraft: boolean;
  isExpired: boolean;
  isHR: boolean;
  items: ICompetencyEmployeeItem[];
  changes?: IBaseChanges;
}