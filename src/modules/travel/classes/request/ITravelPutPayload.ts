import { IBasePayload } from '@generic/interfaces';
import { ITravelPutItem } from './ITravelPutItem';

export interface ITravelPutPayload extends IBasePayload {
  destinationType: string;
  start: string;
  end: string;
  customerUid: string;
  projectUid: string;
  siteUid?: string;
  activityType: string;
  objective?: string;
  target?: string;
  comment?: string;
  items: ITravelPutItem[];
}