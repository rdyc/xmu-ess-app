import { IQuerySingleState } from '@generic/interfaces';
import { IAnnouncementGetRequest } from '../queries/announcement';
import { IAnnouncement } from '../response/announcement';

export interface IAnnouncementState {
  announcementGet: IQuerySingleState<IAnnouncementGetRequest, IAnnouncement>;
}
