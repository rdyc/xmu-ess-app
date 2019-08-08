import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyMapped {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  categoryUid: string;
  category: IHrCompetencyCategoryList;
  changes?: IBaseChanges;
}