export interface IKPIAssignGetByYearRequest {
  readonly companyUid: string;
  readonly positionUid: string;
  readonly employeeUid: string;
  readonly year: number;
}