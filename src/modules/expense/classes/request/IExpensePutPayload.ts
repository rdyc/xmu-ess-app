import { IExpenseClientPostPayload } from '@expense/classes/request/IExpenseClientPostPayload';
import { IBasePayload } from '@generic/interfaces';

export interface IExpensePutPayload extends IBasePayload {
  customerUid: string;
  projectUid: string;
  date: string;
  expenseType: string;
  value: number;
  location: string;
  address: string;
  client: IExpenseClientPostPayload;
  notes?: string | null;
}