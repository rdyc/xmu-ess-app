import { ILeaveCancellationGetAllFilter } from '@leave/classes/filters/cancellation';

export interface ILeaveCancellationGetAllRequest {
  readonly filter: ILeaveCancellationGetAllFilter | undefined;
}