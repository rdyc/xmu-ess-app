import { IEmployeeTrainingPostPayload } from '@account/classes/request/employeeTraining';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeTrainingPostRequest extends IBaseCommand<IEmployeeTrainingPostPayload> {
  employeeUid: string;
}