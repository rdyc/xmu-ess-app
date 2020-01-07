import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IPosition } from '@lookup/classes/response';
import { ICompetencyEmployeeItem } from './ICompetencyEmployeeItem';

export interface IHrCompetencyEmployeeList {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  respondenUid: string;
  responden?: IAccountEmployee;
  positionUid: string;
  position?: IPosition;
  score?: number;
  statusType: string;
  status?: ICommonSystem;
  dueDate?: string;
  isDraft?: boolean;
  items: ICompetencyEmployeeItem[];
}