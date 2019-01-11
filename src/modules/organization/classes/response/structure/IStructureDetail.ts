import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes/';
import { IStructureItem } from '@organization/classes/response/structure';

export interface IStructureDetail {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  description: string;
  inactiveDate?: string;
  reportTo?: IStructureItem[];
  isExpired: boolean;
  changes?: IBaseChanges;
}