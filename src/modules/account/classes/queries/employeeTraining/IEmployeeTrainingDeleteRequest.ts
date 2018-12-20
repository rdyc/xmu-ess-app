import { IEmployeeTrainingDeletePayload } from '@account/classes/request/employeeTraining';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeTrainingDeleteRequest extends IBaseCommand<IEmployeeTrainingDeletePayload>{
  employeeUid: string;  
}