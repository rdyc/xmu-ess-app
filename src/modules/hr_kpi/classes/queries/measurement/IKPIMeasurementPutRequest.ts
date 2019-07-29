import { IBaseCommand } from '@generic/interfaces';
import { IKPIMeasurementPutPayload } from '../../request/measurement';

export interface IKPIMeasurementPutRequest extends IBaseCommand<IKPIMeasurementPutPayload> {
  categoryUid: string;
  measurementUid: string;
}