import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendsQuery extends IBaseFilter, IBasePagingFilter {}

export interface ITravelApprovalgetAllFilter {
  companyUid: string | undefined;
  positionUid: string | undefined;
  status: 'pending' | 'complete' | undefined;
  isNotify: boolean | undefined;
  query?: IExtendsQuery | undefined;
}