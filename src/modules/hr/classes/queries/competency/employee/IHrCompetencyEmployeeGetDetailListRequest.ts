import { IHrCompetencyEmployeeGetDetailListFilter } from '@hr/classes/filters';

export interface IHrCompetencyEmployeeGetDetailListRequest {
  respondenUid: string;
  positionUid: string;
  readonly filter?: IHrCompetencyEmployeeGetDetailListFilter | undefined;
}