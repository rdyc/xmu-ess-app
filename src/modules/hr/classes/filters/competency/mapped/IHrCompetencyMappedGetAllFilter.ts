import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyMappedGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
}