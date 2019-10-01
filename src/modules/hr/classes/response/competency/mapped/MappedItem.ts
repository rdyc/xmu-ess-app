import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';
import { MappedLevelItem } from './IMappedLevelItem';

export interface MappedItem {
  uid: string;
  category: IHrCompetencyCategoryList;
  mappedLevels: MappedLevelItem[];
  changes?: IBaseChanges;
}