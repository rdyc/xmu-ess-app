import { IBasePayload } from '@generic/interfaces';

export interface IKPICategoryPutPayload extends IBasePayload {
  name: string;
  group: 'kpi' | 'personal';
}