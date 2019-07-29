import { IBaseCommand } from '@generic/interfaces';
import { IKPIMeasurementPostPayload } from '../../request/measurement';

export interface IKPIMeasurementPostRequest extends IBaseCommand<IKPIMeasurementPostPayload> {
  categoryUid: string;
}