import { ILookupCompany, ILookupPosition } from '@lookup/classes';
import { MappedItem } from './MappedItem';

export interface IHrCompetencyMappedList {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  categories: MappedItem[];
}