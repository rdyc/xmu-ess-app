import { ICommonSystem } from '@common/classes';

export interface IEmployeeTrainingList {
  uid: string;
  trainingType: string;
  training: ICommonSystem | null;
  certificationType: string;
  certification: ICommonSystem | null;
  name: string;
  organizer: string;
  start: string;
  end: string | null;
}