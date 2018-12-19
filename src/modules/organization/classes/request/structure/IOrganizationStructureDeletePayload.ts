import { IBasePayload } from '@generic/interfaces';

export interface IOrganizationStructureDeletePayload extends IBasePayload {
  strctureUid: string;
  companyUid: string;
}