import { IExpensePostPayload } from '@expense/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IExpensePostRequest extends IBaseCommand<IExpensePostPayload> {
  companyUid: string;
  positionUid: string;
}