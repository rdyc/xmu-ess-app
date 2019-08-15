export interface IEmployeeKPIPostBulkPayload {
  templateUid: string;
  period: number;
  year: number;
  employeeUids: string[];
}