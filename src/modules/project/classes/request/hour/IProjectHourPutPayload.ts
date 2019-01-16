import { IBasePayload } from '@generic/interfaces';

export interface IProjectHourPutPayload extends IBasePayload {
  hours: number;
}