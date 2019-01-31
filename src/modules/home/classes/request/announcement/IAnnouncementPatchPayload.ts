import { IBasePayload } from '@generic/interfaces';
import { IAnnouncementItemPatchPayload } from './IAnnouncementItemPatchPayload';

export interface IAnnouncementPatchPayload extends IBasePayload {
  item?: IAnnouncementItemPatchPayload[];
}