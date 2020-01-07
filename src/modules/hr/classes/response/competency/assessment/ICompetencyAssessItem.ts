import { IBaseChanges } from '@generic/interfaces';

export interface ICompetencyAssessItem {
  uid: string;
  competencyUid: string;
  categoryUid: string;
  categoryName: string;
  categoryDescription: string;
  levelUid: string;
  level: number;
  levelDescription: string;
  indicators: string;
  note?: string;
  changes?: IBaseChanges;
}