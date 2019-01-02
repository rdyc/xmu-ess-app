import { IEmployeeRatePutPayload } from '@account/classes/request/employeeRate';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeRatePutRequest extends IBaseCommand<IEmployeeRatePutPayload> {
  employeeUid: string;
}