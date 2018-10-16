import { IExpensePutPayload } from '@expense/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IExpensePutRequest extends IBaseCommand<IExpensePutPayload> {
  companyUid: string;
  positionUid: string;
  expenseUid: string;
}