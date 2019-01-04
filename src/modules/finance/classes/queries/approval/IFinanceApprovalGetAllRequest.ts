import { IFinanceApprovalGetAllFilter } from '@finance/classes/filters/approval';
import { ICompanyAccess } from '@generic/interfaces';

export interface IFinanceApprovalGetAllRequest extends ICompanyAccess {
  readonly filter?: IFinanceApprovalGetAllFilter;
}