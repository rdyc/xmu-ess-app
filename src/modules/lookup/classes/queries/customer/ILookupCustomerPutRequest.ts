import { IBaseCommand } from '@generic/interfaces';
import { ILookupCustomerPutPayload } from '@lookup/classes/request/customer/ILookupCustomerPutPayload';

export interface ILookupCustomerPutRequest extends IBaseCommand<ILookupCustomerPutPayload> {
  companyUid: string;
  customerUid: string;
}