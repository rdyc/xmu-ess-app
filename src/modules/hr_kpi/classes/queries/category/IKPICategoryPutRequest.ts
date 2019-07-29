import { IBaseCommand } from '@generic/interfaces';
import { IKPICategoryPutPayload } from '../../request/category';

export interface IKPICategoryPutRequest extends IBaseCommand<IKPICategoryPutPayload> {
  categoryUid: string;
}