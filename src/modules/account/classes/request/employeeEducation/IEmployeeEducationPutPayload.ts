export interface IEmployeeEducationPutPayload {
  uid: string;
  employeeUid: string;
  degreeType: string;
  institution: string;
  major: string;
  start: number;
  end: number;
}