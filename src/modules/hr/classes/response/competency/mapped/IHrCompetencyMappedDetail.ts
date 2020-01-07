import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';
import { MappedItem } from './MappedItem';

export interface IHrCompetencyMappedDetail {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  categories: MappedItem[];
  changes?: IBaseChanges;
}