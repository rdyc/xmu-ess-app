import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeTraining {
  uid: string;
  trainingType: string;
  training?: ICommonSystem;
  certificationType: string;
  certification?: ICommonSystem;
  name: string;
  organizer: string;
  start: string;
  end?: string;
  changes?: IBaseChanges;
}