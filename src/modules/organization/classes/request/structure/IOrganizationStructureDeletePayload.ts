import { IBasePayload } from '@generic/interfaces';

export interface IOrganizationStructureDeletePayload extends IBasePayload {
  structureUid: string;
  companyUid: string;
}