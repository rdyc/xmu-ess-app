import { ILookupPosition } from '@lookup/classes';
import { MappedItem } from './MappedItem';

export interface IHrCompetencyMappedList {
  uid: string;
  positionUid: string;
  position?: ILookupPosition;
  categories: MappedItem[];
}