import { DirectionType } from '@generic/types';

export interface IHrCompetencyClusterGetListFilter {
  clusterUid?: string;
  orderBy?: string;
  direction?: DirectionType;
}