import { IBasePayload } from '@generic/interfaces';

export interface IProjectSitePayload extends IBasePayload {
  name: string;
  value: number;
  siteType: string;
}