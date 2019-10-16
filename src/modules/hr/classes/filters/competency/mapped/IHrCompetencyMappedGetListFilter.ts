import { DirectionType } from '@generic/types';

export interface IHrCompetencyMappedGetListFilter {
  companyUid?: string;
  positionUid?: string;
  orderBy?: string;
  direction?: DirectionType;
}