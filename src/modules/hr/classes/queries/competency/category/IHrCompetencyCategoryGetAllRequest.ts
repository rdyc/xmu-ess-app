import { IHrCompetencyCategoryGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyCategoryGetAllRequest {
  clusterUid: string;
  readonly filter: IHrCompetencyCategoryGetAllFilter | undefined;  
}