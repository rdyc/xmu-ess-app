import { DirectionType } from '@generic/types';

export interface IHrCompetencyCategoryGetListFilter {
  competencyUid: string;
  orderBy?: string;
  direction?: DirectionType;
}