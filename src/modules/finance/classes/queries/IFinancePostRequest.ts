import { IBaseCommand } from '@generic/interfaces';
import { IFinancePostPayload } from '../request';

export interface IFinancePostRequest extends IBaseCommand<IFinancePostPayload> {
  companyUid: string;
  positionUid: string;
  financeUid: string;
}