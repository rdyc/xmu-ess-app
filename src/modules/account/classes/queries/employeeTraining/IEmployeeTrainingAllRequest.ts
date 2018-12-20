import { IEmployeeTrainingAllFilter } from '@account/classes/filters/employeeTraining';

export interface IEmployeeTrainingAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeTrainingAllFilter | undefined;
}