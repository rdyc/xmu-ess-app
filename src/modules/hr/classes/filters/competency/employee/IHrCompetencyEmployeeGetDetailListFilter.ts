import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyEmployeeGetDetailListFilter extends IBasePagingFilter {
  respondenUid: string;
  companyUid: string;
  positionUid: string;
  assessmentYear: string;
}