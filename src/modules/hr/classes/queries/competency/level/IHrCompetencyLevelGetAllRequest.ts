import { IHrCompetencyLevelGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyLevelGetAllRequest {
  clusterUid: string;
  categoryUid: string;
  readonly filter: IHrCompetencyLevelGetAllFilter | undefined;  
}