import { IKPITemplatePostItem } from './IKPITemplatePostItem';

export interface IKPITemplatePutPayload {
  companyUid: string;
  positionUid: string;
  items: IKPITemplatePostItem[];
}