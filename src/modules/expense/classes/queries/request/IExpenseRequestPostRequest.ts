import { IExpenseRequestPostPayload } from '@expense/classes/request/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IExpenseRequestPostRequest extends IBaseCommand<IExpenseRequestPostPayload> {
  companyUid: string;
  positionUid: string;
}