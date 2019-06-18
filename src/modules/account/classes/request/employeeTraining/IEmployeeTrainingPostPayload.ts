export interface IEmployeeTrainingPostPayload {
  trainingType: string;
  certificationType: string;
  name: string;
  organizer: string;
  start: string;
  end?: string;
}