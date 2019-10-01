import { IBaseCommand } from '@generic/interfaces';
import { IEmployeeLevelPutPayload } from '@lookup/classes/request';

export interface IEmployeeLevelPutRequest extends IBaseCommand<IEmployeeLevelPutPayload> {
  employeeLevelUid: string;
}