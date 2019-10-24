import { IHrCompetencyMappedGetNextFilter } from '@hr/classes/filters';

export interface IHrCompetencyMappedGetNextRequest {
  positionUid: string;
  employeeLevel: string;
  filter?: IHrCompetencyMappedGetNextFilter;
}