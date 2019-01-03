import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';

export interface IEmployeeAccessHistory {
  uid: string;
  companyUid: string;
  company: ILookupCompany | null;
  positionUid: string;
  position: ILookupPosition | null;
  unitType: string;
  unit: ICommonSystem | null;
  departmentType: string;
  department: ICommonSystem | null;
  levelType: string;
  level: ICommonSystem | null;
  start: string;
  end: string | null;
  changes: IBaseChanges | null;
}