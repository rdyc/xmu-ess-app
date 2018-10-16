import { ISystemLimitAllFilter } from '@lookup/classes/filters';

export interface ISystemLimitAllRequest {
  readonly filter?: ISystemLimitAllFilter | undefined;
}