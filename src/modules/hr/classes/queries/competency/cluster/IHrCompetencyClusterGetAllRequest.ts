import { IHrCompetencyClusterGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyClusterGetAllRequest {
  readonly filter: IHrCompetencyClusterGetAllFilter | undefined;
}