import { IBasePayload } from '@generic/interfaces';
import { ITravelPutItem } from './ITravelPutItem';

export interface ITravelPutPayload extends IBasePayload {
  destinationType: string;
  start: string;
  end: string;
  customerUid: string;
  projectUid: string;
  siteUid: string;
  activityType: string;
  objective: string | null;
  target: string | null;
  comment: string | null;
  items: ITravelPutItem[];
}