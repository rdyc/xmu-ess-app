import { IExpenseApprovalPostPayload } from '@expense/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IExpenseApprovalPostRequest extends IBaseCommand<IExpenseApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  expenseUid: string;
}