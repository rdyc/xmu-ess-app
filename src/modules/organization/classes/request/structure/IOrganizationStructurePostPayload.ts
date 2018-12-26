import { IBasePayload } from '@generic/interfaces';
import { IOrganizationStructurePostItem } from './IOrganizationStructurePostItem';

export interface IOrganizationStructurePostPayload extends IBasePayload {
  positionUid: string;
  description?: string;
  inactiveDate?: string;
  reportTo: IOrganizationStructurePostItem[];
}