export interface IEmployeeEducationPostPayload {
  degreeType: string;
  institution: string;
  major: string;
  start: number;
  end?: number;
}