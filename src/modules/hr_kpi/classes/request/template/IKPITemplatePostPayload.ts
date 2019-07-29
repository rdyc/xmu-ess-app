import { IKPITemplatePostItem } from './IKPITemplatePostItem';

export interface IKPITemplatePostPayload {
  companyUid: string;
  positionUid: string;
  items: IKPITemplatePostItem[];
}