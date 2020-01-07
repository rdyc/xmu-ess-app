import { IHrCompetencyCategoryGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyCategoryGetAllRequest {
  clusterUid: string;
  filter?: IHrCompetencyCategoryGetAllFilter;  
}