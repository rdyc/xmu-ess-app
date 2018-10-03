import { IProjectSitePayload } from '@project/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IProjectSitePutRequest extends IBaseCommand<IProjectSitePayload> {
  companyUid: string;
  projectUid: string;
  siteUid: string;
  payload: IProjectSitePayload;
}