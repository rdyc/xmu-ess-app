import { IBaseCommand } from '@generic/interfaces';
import { IPositionPostPayload } from '@lookup/classes/request';

export interface IPositionPostRequest extends IBaseCommand<IPositionPostPayload> {
  companyUid: string;
}