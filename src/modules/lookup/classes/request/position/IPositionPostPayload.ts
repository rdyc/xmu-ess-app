import { IBasePayload } from '@generic/interfaces';

export interface IPositionPostPayload extends IBasePayload {
  name:               string;
  description?:       string;
  isAllowMultiple:    boolean;
  inactiveDate?:       string;
}