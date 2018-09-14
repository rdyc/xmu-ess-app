import { IProjectSitePayload } from '@project/interfaces/payloads';
import { IBaseCommand } from '@generic/interfaces';

export interface IProjectSiteUpdateCommand extends IBaseCommand<IProjectSitePayload> {
  companyUid: string;
  projectUid: string;
  siteUid: string;
  payload: IProjectSitePayload;
}