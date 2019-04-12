import { IBaseCommand } from '@generic/interfaces';
import { IProjectSitePatchPayload } from '@project/classes/request/site';

export interface IProjectSitePatchRequest extends IBaseCommand<IProjectSitePatchPayload> {
  companyUid: string;
  projectUid: string;
}