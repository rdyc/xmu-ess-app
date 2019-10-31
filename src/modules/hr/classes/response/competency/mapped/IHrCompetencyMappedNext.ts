import { IEmployeeLevel } from '@lookup/classes/response';
import { IHrCompetencyLevelList } from '../level/IHrCompetencyLevelList';

export interface IHrCompetencyMappedNext {
  uid: string;
  employeeLevelUid: string;
  employeeLevel: IEmployeeLevel;
  categoryLevelUid: string;
  categoryLevel: IHrCompetencyLevelList;
}