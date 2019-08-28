import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyEmployeeGetAllFilter extends IBasePagingFilter {
  status?: string;
}