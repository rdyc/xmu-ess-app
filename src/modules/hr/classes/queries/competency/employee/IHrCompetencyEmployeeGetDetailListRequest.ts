import { IHrCompetencyEmployeeGetDetailListFilter } from '@hr/classes/filters';

export interface IHrCompetencyEmployeeGetDetailListRequest {
  respondenUid: string;
  positionUid: string;
  assessmentYear: string;
  readonly filter?: IHrCompetencyEmployeeGetDetailListFilter | undefined;
}