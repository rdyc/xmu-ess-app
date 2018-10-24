import { IBaseCommand } from '@generic/interfaces';

export interface IProjectSiteDeleteRequest extends IBaseCommand<{}> {
  companyUid: string;
  projectUid: string;
  siteUid: string;
}