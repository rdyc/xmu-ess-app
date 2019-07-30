import { ILookupPosition } from '@lookup/classes';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyMappedList {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  categoryUid: string;
  category: IHrCompetencyCategoryList;
}