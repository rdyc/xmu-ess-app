import { IEmployeeTrainingListFilter } from '@account/classes/filters/employeeTraining';

export interface IEmployeeTrainingListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeTrainingListFilter | undefined;
}