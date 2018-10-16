import { IBaseCommand } from '@generic/interfaces';
import { IProjectSitePayload } from '@project/classes/request';

export interface IProjectSitePutRequest extends IBaseCommand<IProjectSitePayload> {
  companyUid: string;
  projectUid: string;
  siteUid: string;
  data: IProjectSitePayload;
}