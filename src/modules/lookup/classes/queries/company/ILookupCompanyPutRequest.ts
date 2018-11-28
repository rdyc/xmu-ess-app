import { IBaseCommand } from '@generic/interfaces';
import { ILookupCompanyPutPayload } from '@lookup/classes/request/company';

export interface ILookupCompanyPutRequest extends IBaseCommand<ILookupCompanyPutPayload> {
  // companyUid: string;
}