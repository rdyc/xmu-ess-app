import { IAccountEmployeeCompetencyGetAllFilter } from '@hr/classes/filters';

export interface IAccountEmployeeCompetencyGetAllRequest {
  readonly filter: IAccountEmployeeCompetencyGetAllFilter | undefined;
}