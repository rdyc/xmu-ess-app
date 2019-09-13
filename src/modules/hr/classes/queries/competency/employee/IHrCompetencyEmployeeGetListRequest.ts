import { IHrCompetencyEmployeeGetListFilter } from '@hr/classes/filters';

export interface IHrCompetencyEmployeeGetListRequest {
  readonly filter: IHrCompetencyEmployeeGetListFilter | undefined;  
}