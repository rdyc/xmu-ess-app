import { IHrCompetencyIndicatorGetListFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyIndicatorGetListRequest {
  clusterUid: string;
  categoryUid: string;
  levelUid: string;
  readonly filter: IHrCompetencyIndicatorGetListFilter | undefined;  
}