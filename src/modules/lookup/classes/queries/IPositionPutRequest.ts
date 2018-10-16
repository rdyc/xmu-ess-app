import { IBaseCommand } from '@generic/interfaces';
import { IPositionPutPayload } from '@lookup/classes/request';

export interface IPositionPutRequest extends IBaseCommand<IPositionPutPayload> {
  companyUid:  string;
  positionUid: string;
}