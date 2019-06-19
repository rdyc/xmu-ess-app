import { IBaseCommand } from '@generic/interfaces';
import { IHRMeasurementPutPayload } from '../../request/measurement';

export interface IHRMeasurementPutRequest extends IBaseCommand<IHRMeasurementPutPayload> {
  measurementUid: string;
}