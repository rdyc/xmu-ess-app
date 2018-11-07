import { IBasePayload } from '@generic/interfaces';
import { ITravelPostItem } from './ITravelPostItem';

export interface ITravelPostPayload extends IBasePayload {
  destinationType: string;
  start: string;
  end: string;
  customerUid: string;
  projectUid: string;
  siteUid: string | null;
  activityType: string;
  objective: string;
  target: string;
  comment: string;
  items?: ITravelPostItem[];
}