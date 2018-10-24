import { IBaseCommand } from '@generic/interfaces';
import { IProjectSitePayload } from '@project/classes/request/site';

export interface IProjectSitePostRequest extends IBaseCommand<IProjectSitePayload> {
  companyUid: string;
  projectUid: string;
}