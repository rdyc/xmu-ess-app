import { IEmployeeDeletePayload } from '@account/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeDeleteRequest extends IBaseCommand<IEmployeeDeletePayload> {
  //
}