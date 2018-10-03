import { IBaseCommand } from '@generic/interfaces';
import { IProjectSitePayload } from '@project/classes/request';

export interface IProjectSitePostRequest extends IBaseCommand<IProjectSitePayload> {
  companyUid: string;
  projectUid: string;
}