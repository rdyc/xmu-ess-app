import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyEmployeeGetDetailListFilter extends IBasePagingFilter {
  respondenUid: string;
  positionUid: string;
}