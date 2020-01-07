import { IBasePagingFilter } from '@generic/interfaces';

export interface IAccountEmployeeCompetencyGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  isAssess?: boolean;
  year?: number;
  isActive?: boolean;
}