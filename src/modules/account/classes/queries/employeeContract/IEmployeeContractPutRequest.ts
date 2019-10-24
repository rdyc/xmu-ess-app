import { IEmployeeContractPutPayload } from '@account/classes/request/employeeContract';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeContractPutRequest extends IBaseCommand<IEmployeeContractPutPayload> {
  employeeUid: string;
}