import { ICommonSystem } from '@common/classes';
import { ILookupCompany, ILookupPosition } from '@lookup/classes';

export interface IEmployeeAccessHistoryList {
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
}