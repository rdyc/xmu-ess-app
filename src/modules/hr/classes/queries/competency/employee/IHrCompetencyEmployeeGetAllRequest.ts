import { IHrCompetencyEmployeeGetAllFilter } from '@hr/classes/filters';

export interface IHrCompetencyEmployeeGetAllRequest {
  readonly filter: IHrCompetencyEmployeeGetAllFilter | undefined;  
}