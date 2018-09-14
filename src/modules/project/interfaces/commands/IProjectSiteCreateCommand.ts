import { IBaseCommand } from '@generic/interfaces';
import { IProjectSitePayload } from '@project/interfaces/payloads';

export interface IProjectSiteCreateCommand extends IBaseCommand<IProjectSitePayload> {
  companyUid: string;
  projectUid: string;
}