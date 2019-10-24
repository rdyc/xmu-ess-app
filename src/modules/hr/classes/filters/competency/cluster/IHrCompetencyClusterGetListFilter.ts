import { DirectionType } from '@generic/types';

export interface IHrCompetencyClusterGetListFilter {
  competencyUid?: string;
  orderBy?: string;
  direction?: DirectionType;
}