import { IHrCompetencyCategoryGetListFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyCategoryGetListRequest {
  competencyUid: string;
  filter?: IHrCompetencyCategoryGetListFilter;  
}