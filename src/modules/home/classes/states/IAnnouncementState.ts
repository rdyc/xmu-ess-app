import { IQueryCollectionState } from '@generic/interfaces';
import { IAnnouncementGetRequest, IAnnouncementPatchRequest } from '../queries/announcement';
import { IAnnouncement } from '../response/announcement';

export interface IAnnouncementState {
  announcementGet: IQueryCollectionState<IAnnouncementGetRequest, IAnnouncement>;
  announcementPatch: IQueryCollectionState<IAnnouncementPatchRequest, IAnnouncement>;
}
