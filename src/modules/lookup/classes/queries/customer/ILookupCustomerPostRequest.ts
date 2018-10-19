import { IBaseCommand } from '@generic/interfaces';
import { ILookupCustomerPostPayload } from '@lookup/classes/request/customer/ILookupCustomerPostPayload';

export interface ILookupCustomerPostRequest extends IBaseCommand<ILookupCustomerPostPayload> {
  companyUid: string;
}