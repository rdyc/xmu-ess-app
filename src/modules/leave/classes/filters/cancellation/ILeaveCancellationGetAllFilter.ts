import { IBasePagingFilter } from '@generic/interfaces';

export interface ILeaveCancellationGetAllFilter extends IBasePagingFilter {
  leaveType?: string;
}