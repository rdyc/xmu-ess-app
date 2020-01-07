import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyCategoryGetAllFilter extends IBasePagingFilter {
  clusterUid: string;
}