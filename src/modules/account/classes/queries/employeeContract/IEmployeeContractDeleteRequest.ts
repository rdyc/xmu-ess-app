import { IEmployeeContractDeletePayload } from '@account/classes/request/employeeContract';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeContractDeleteRequest extends IBaseCommand<IEmployeeContractDeletePayload> {
  employeeUid: string;
}