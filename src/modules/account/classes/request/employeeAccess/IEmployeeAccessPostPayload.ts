export interface IEmployeeAccessPostPayload {
  companyUid: string;
  positionUid: string;
  roleUid: string;
  employeeUid: string;
  unitType: string;
  departmentType: string;
  levelType: string;
  start: string;
  end?: string | null;
}