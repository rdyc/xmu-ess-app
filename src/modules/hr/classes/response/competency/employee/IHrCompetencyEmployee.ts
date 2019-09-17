import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IPosition } from '@lookup/classes/response';
import { ICompetencyEmployeeItem } from './ICompetencyEmployeeItem';

export interface IHrCompetencyEmployee {
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
  changes?: IBaseChanges;
}