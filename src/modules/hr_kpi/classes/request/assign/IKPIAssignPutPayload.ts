import { IKPIAssignItemPostPayload } from './IKPIAssignItemPutPayload';

export interface IKPIAssignPutPayload {
  templateUid: string;
  year: number;
  isFinal: boolean;
  revision?: string;
  items: IKPIAssignItemPostPayload[];
}