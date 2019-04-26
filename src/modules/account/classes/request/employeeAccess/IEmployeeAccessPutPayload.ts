export interface IEmployeeAccessPutPayload {
  uid: string;
  companyUid: string;
  positionUid: string;
  roleUid: string;
  unitType?: string;
  departmentType?: string;
  levelType: string;
  start: string;
  end?: string;
}