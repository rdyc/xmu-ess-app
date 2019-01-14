import { IExpenseRequestClientPostPayload } from '@expense/classes/request/request/IExpenseRequestClientPostPayload';
import { IBasePayload } from '@generic/interfaces';

export interface IExpenseRequestPutPayload extends IBasePayload {
  customerUid: string;
  projectUid: string;
  date: string;
  expenseType: string;
  value: number;
  location: string;
  address: string;
  client: IExpenseRequestClientPostPayload;
  notes?: string;
}