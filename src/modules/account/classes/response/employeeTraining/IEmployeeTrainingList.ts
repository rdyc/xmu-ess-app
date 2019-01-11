import { ICommonSystem } from '@common/classes';

export interface IEmployeeTrainingList {
  uid: string;
  trainingType: string;
  training?: ICommonSystem;
  certificationType: string;
  certification?: ICommonSystem;
  name: string;
  organizer: string;
  start: string;
  end?: string;
}