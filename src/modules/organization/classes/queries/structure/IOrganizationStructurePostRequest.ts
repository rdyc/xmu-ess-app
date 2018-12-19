import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationStructurePostPayload } from '@organization/classes/request/structure';

export interface IOrganizationStructurePostRequest extends IBaseCommand<IOrganizationStructurePostPayload> {
  companyUid: string;
}