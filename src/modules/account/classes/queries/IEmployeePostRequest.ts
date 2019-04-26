import { IEmployeePostPayload } from '@account/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeePostRequest extends IBaseCommand<IEmployeePostPayload> {
  companyUid: string;
}