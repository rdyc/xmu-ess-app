import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface ILeaveCancellationGetAllFilter {
  leaveType?: string;
  query?: IExtendedQuery | undefined;
}