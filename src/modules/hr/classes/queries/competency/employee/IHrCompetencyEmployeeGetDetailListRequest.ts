import { IHrCompetencyEmployeeGetDetailListFilter } from '@hr/classes/filters';

export interface IHrCompetencyEmployeeGetDetailListRequest {
  readonly filter: IHrCompetencyEmployeeGetDetailListFilter | undefined;
}