import { ISystemLimitListFilter } from '@lookup/classes/filters';

export interface ISystemLimitListRequest {
  readonly filter?: ISystemLimitListFilter | undefined;
}