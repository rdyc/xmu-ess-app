import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';
import { MappedItem } from './MappedItem';

export interface IHrCompetencyMappedDetail {
  uid: string;
  positionUid: string;
  position: ILookupPosition;
  categories: MappedItem[];
  changes?: IBaseChanges;
}