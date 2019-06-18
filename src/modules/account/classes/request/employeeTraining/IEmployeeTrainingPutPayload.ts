export interface IEmployeeTrainingPutPayload {
  uid: string;
  trainingType: string;
  certificationType: string;
  name: string;
  organizer: string;
  start: string;
  end?: string;
}