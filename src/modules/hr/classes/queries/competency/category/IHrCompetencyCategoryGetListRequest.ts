import { IHrCompetencyCategoryGetListFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyCategoryGetListRequest {
  clusterUid: string;
  filter?: IHrCompetencyCategoryGetListFilter;  
}