import { IWebJobDefinitionJob } from '../definition/IWebJobDefinitionJob';
import { CronModel } from './CronModel';

export interface IWebJobRecurringDetail {
  uid: string;
  jobUid: string;
  job: IWebJobDefinitionJob;
  name: string;
  description: string;
  cron: CronModel;
  isAutoStart: boolean;
}