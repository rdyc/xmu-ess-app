import { IHRTemplatePostItem } from './IHRTemplatePostItem';

export interface IHRTemplatePostPayload {
  companyUid: string;
  positionUid: string;
  items: IHRTemplatePostItem[];
}