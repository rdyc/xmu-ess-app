import { IBaseCommand } from '@generic/interfaces';
import { IFinanceBulkPostPayload } from '../request';

export interface IFinanceBulkPostRequest extends IBaseCommand<IFinanceBulkPostPayload> {
  companyUid: string;
  positionUid: string;
}