import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes/';
import { IStructureItem } from '@organization/classes/response/structure';

export interface IStructure {
  uid: string;
  companyUid: string;
  company: ILookupCompany | null;
  positionUid: string;
  position: ILookupPosition | null;
  description: string | null;
  inactiveDate?: string;
  reportTo?: IStructureItem[] | null;
  isExpired: boolean;
  changes?: IBaseChanges | null;
}