import { IEmployeeContractPostPayload } from '@account/classes/request/employeeContract';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeContractPostRequest extends IBaseCommand<IEmployeeContractPostPayload> {
  employeeUid: string;
}