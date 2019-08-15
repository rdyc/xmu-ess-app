import { IHrCompetencyMappedGetAllFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyMappedGetAllRequest {
  readonly filter: IHrCompetencyMappedGetAllFilter | undefined;
}