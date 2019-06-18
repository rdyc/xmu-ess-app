export interface IEmployeeEducationPutPayload {
  uid: string;
  degreeType: string;
  institution: string;
  major: string;
  start: number;
  end?: number;
}