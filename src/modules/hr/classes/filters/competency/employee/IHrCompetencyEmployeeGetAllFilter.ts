import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyEmployeeGetAllFilter extends IBasePagingFilter {
  employeeUid?: string;
  isResult?: boolean;
  status?: 'pending' | 'complete' | string;
  statusType?: string;
}