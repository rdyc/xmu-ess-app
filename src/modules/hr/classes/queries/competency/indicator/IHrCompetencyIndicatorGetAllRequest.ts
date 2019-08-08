import { IHrCompetencyIndicatorGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyIndicatorGetAllRequest {
  levelUid: string;
  clusterUid: string;
  categoryUid: string;
  readonly filter: IHrCompetencyIndicatorGetAllFilter | undefined;  
}