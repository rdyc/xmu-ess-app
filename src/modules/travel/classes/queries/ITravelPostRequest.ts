import { IBaseCommand } from '@generic/interfaces';
import { ITravelPostPayload } from '../request';

export interface ITravelPostRequest extends IBaseCommand<ITravelPostPayload> {
  companyUid: string;
  positionUid: string;
}