import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';

export interface IEmployeeAccessHistory {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  positionUid: string;
  position?: ILookupPosition;
  unitType: string;
  unit?: ICommonSystem;
  departmentType: string;
  department?: ICommonSystem;
  levelType: string;
  level?: ICommonSystem;
  start: string;
  end?: string;
  changes?: IBaseChanges;
}