import { IBasePayload } from '@generic/interfaces';

export interface IPositionPutPayload extends IBasePayload {
  name:               string;
  description?:       string;
  isAllowMultiple:    boolean;
  inactiveDate?:      string;
}