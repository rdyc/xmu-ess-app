import { IHRTemplatePostItem } from './IHRTemplatePostItem';

export interface IHRTemplatePutPayload {
  companyUid: string;
  positionUid: string;
  items: IHRTemplatePostItem[];
}