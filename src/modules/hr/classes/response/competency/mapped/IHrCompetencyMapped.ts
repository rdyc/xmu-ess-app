import { IBaseChanges } from '@generic/interfaces';
import { ILookupPosition } from '@lookup/classes';
import { MappedItem } from './MappedItem';

export interface IHrCompetencyMapped {
  uid: string;
  positionUid: string;
  position: ILookupPosition;
  categories: MappedItem[];
  changes?: IBaseChanges;
}