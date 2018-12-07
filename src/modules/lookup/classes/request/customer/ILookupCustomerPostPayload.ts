import { IBasePayload } from '@generic/interfaces';

export interface ILookupCustomerPostPayload extends IBasePayload {
  // todo
  name: string;
  npwp: string | null;
  address: string | null;
  addressAdditional: string | null;
  phone: string | null;
  phoneAdditional: string | null;
  mobile: string | null;
  mobileAdditional: string | null;
  fax: string | null;
  emailAddress: string | null;
  contactPerson: string | null;
  contactPersonAdditional: string | null;
  contactTitle: string | null;
  contactTitleAdditional: string | null;
  isActive: boolean;
}