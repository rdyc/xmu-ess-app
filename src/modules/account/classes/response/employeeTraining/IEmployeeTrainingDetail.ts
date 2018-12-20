import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeTrainingDetail {
  uid: string;
  trainingType: string;
  training: ICommonSystem | null;
  certificationType: string;
  certification: ICommonSystem | null;
  name: string;
  organizer: string;
  start: string;
  end: string | null;
  changes: IBaseChanges | null;
}