import { IHrCompetencyLevelGetListFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyLevelGetListRequest {
  clusterUid: string;
  categoryUid: string;
  readonly filter: IHrCompetencyLevelGetListFilter | undefined;  
}