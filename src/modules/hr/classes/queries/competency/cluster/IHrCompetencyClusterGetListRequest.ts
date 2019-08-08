import { IHrCompetencyClusterGetListFilter } from 'modules/hr/classes/filters';

export interface IHrCompetencyClusterGetListRequest {
  readonly filter: IHrCompetencyClusterGetListFilter | undefined;
}