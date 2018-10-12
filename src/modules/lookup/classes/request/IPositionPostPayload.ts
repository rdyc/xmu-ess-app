import { IBasePayload } from '@generic/interfaces';

export interface IPositionPostPayload extends IBasePayload {
  name:               string;
  description?:       string | null;
  isAllowMultiple:    boolean;
  inactiveDate?:       string | null;
}