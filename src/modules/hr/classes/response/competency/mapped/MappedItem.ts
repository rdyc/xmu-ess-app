import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface MappedItem {
  uid: string;
  category: IHrCompetencyCategoryList;
  changes?: IBaseChanges;
}