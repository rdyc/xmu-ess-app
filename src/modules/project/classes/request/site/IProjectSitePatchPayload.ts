import { IBasePayload } from '@generic/interfaces';

import { IProjectSiteItem } from './IProjectSiteItem';

export interface IProjectSitePatchPayload extends IBasePayload {
  sites: IProjectSiteItem[];
}