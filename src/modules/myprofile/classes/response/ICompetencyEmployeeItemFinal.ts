import { IBaseChanges } from '@generic/interfaces';

export interface ICompetencyEmployeeItemFinal {
  uid: string;
  competencyEmployeeUid: string;
  categoryUid: string;
  categoryName: string;
  categoryDescription: string;
  levelUid: string;
  level: number;
  levelDescription: string;
  indicators: string;
  note?: string;
  change?: IBaseChanges;
}