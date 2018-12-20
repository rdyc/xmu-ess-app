import { IEmployeeTrainingPutPayload } from '@account/classes/request/employeeTraining';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeTrainingPutRequest extends IBaseCommand<IEmployeeTrainingPutPayload>{
  employeeUid: string;
}