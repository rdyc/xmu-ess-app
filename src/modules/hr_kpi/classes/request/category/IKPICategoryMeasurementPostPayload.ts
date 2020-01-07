import { IBasePayload } from '@generic/interfaces';
import { IKPIMeasurementPostPayload } from '../measurement';

export interface IKPICategoryMeasurementPostPayload extends IBasePayload {
  name: string;
  group: 'kpi' | 'personal';
  items: IKPIMeasurementPostPayload[];
}