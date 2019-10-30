import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';
import { ICompetencyEmployeeItem } from './ICompetencyEmployeeItem';

export interface IHrCompetencyEmployee {
  uid: string;
  assessmentYear: number;
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
  dueDate?: Date;
  isDraft: boolean;
  isExpired: boolean;
  isHR: boolean;
  items: ICompetencyEmployeeItem[];
  totalResponder?: number;
  totalResponse?: number;
  changes?: IBaseChanges;
}