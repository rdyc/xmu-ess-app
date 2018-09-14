import { IBaseCommand } from '@generic/interfaces';

export interface IProjectSiteDeleteCommand extends IBaseCommand<{}> {
  companyUid: string;
  projectUid: string;
  siteUid: string;
}