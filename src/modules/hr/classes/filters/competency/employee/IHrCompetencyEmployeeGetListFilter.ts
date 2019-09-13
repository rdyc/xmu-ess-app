import { DirectionType } from '@generic/types';

export interface IHrCompetencyEmployeeGetListFilter {
  employeeUid?: string;
  orderBy?: string;
  direction?: DirectionType;
}