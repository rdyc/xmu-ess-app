import { IHrCompetencyMappedGetNextFilter } from '@hr/classes/filters';

export interface IHrCompetencyMappedGetNextRequest {
  companyUid: string;
  positionUid: string;
  employeeLevel: string;
  filter?: IHrCompetencyMappedGetNextFilter;
}