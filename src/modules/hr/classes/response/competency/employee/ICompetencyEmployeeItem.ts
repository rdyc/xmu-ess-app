import { IHrCompetencyCategoryList, IHrCompetencyLevelList } from '../..';

import { IBaseChanges } from '@generic/interfaces';

export interface ICompetencyEmployeeItem {
  uid: string;
  competencyEmployeeUid: string;
  categoryUid: string;
  category?: IHrCompetencyCategoryList;
  levelUid: string;
  level?: IHrCompetencyLevelList;
  note?: string;
  latestNote?: string;
  changes?: IBaseChanges;
}