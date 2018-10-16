import { ICompanyAccess } from '@generic/interfaces';
import { ISettlementApprovalGetAllFilter } from '@purchase/classes/filters/settlementHistories';

export interface ISettlementApprovalGetAllRequest extends ICompanyAccess {
  readonly filter: ISettlementApprovalGetAllFilter | undefined;
  isNotify: boolean | undefined;
  status: 'pending' | 'complete' | undefined;
}