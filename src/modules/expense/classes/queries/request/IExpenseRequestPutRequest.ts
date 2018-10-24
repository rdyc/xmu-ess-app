import { IExpenseRequestPutPayload } from '@expense/classes/request/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IExpenseRequestPutRequest extends IBaseCommand<IExpenseRequestPutPayload> {
  companyUid: string;
  positionUid: string;
  expenseUid: string;
}