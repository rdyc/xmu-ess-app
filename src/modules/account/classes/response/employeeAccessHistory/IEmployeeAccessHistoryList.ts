import { ICommonSystem } from '@common/classes';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';

export interface IEmployeeAccessHistoryList {
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
}