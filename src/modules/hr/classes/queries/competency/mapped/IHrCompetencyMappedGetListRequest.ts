import { IHrCompetencyMappedGetListFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyMappedGetListRequest {
  readonly filter: IHrCompetencyMappedGetListFilter | undefined;
}