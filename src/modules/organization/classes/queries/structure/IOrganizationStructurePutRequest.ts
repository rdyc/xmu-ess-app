import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationStructurePutPayload } from '@organization/classes/request/structure';

export interface IOrganizationStructurePutRequest extends IBaseCommand<IOrganizationStructurePutPayload> {
  companyUid: string;
  structureUid: string;
}