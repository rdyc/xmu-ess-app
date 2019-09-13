import { IHrCompetencyCategoryGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyCategoryGetAllRequest {
  competencyUid: string;
  filter?: IHrCompetencyCategoryGetAllFilter;  
}