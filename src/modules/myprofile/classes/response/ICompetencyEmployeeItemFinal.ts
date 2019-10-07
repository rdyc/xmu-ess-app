import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyCategoryList, IHrCompetencyLevelList } from '@hr/classes/response';

export interface ICompetencyEmployeeItemFinal {
  uid: string;
  competencyEmployeeUid: string;
  categoryUid: string;
  category?: IHrCompetencyCategoryList;
  levelUid: string;
  level?: IHrCompetencyLevelList;
  note?: string;
  change?: IBaseChanges;
}