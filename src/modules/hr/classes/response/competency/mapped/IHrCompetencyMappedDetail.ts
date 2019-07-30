import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyMappedDetail {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  categoryUid: string;
  category: IHrCompetencyCategoryList;
  changes?: IBaseChanges;
}