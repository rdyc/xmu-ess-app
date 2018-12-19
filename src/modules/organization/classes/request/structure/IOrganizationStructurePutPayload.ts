import { IBasePayload } from '@generic/interfaces';
import { IOrganizationStructurePutItem } from './IOrganizationStructurePutItem';

export interface IOrganizationStructurePutPayload extends IBasePayload {
  positionUid: string;
  description: string | null;
  inactiveDate?: string | null;
  reportTo: IOrganizationStructurePutItem[];
}