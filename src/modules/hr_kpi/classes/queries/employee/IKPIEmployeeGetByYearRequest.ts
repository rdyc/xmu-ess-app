export interface IKPIEmployeeGetByYearRequest {
  readonly companyUid: string;
  readonly positionUid: string;
  readonly employeeUid: string;
  readonly year: number;
}