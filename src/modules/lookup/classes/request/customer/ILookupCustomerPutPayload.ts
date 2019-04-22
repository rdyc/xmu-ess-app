import { IBasePayload } from '@generic/interfaces';

export interface ILookupCustomerPutPayload extends IBasePayload {
  name: string;
  npwp?: string;
  address?: string;
  addressAdditional?: string;
  phone?: string;
  phoneAdditional?: string;
  mobile?: string;
  mobileAdditional?: string;
  fax?: string;
  emailAddress?: string;
  contactPerson?: string;
  contactPersonAdditional?: string;
  contactTitle?: string;
  contactTitleAdditional?: string;
  isActive?: boolean; 
}