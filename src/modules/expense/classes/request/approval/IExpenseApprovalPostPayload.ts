import { IBasePayload } from '@generic/interfaces';

export interface IExpenseApprovalPostPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string;
}